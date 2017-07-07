import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as appActions from '../actions/appActions';

import Menu from '../components/Menu';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Pattern from '../components/Pattern';

import {SVGSprites} from '../components/SVGSprites';

class App extends Component {

  static propTypes = {
    appActions: PropTypes.object.isRequired,
    axios: PropTypes.func.isRequired,
    currentStore: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      isLoaded: false
    };
  }

  getPatterns(tag = '') {
    const {setAction} = this.props.appActions;
    const {currentStore} = this.props;

    setAction('SET_TAG', tag);

    location.hash = tag ? `search=${tag}` : '';

    if (tag) {
      this.setState({isLoaded: true}, () => setAction('SEACH_PATTERNS', tag));
      return;
    }

    this.setState({
      isLoaded: false
    });

    this.props.axios.get('patterns.json')
    .then((response) => {
      setAction('SET_PATTERNS', response.data);
      this.setState({
        isLoaded: true
      });
    })
    .catch((error) => console.error(error));
  }

  componentWillMount() {
    this.getPatterns();
  }

  componentDidMount() {
    const search = location.hash.split('search=')[1];
    setTimeout(() => {
      if (search) {
        this.getPatterns(search);
      }
    });
  }

  render() {
    const {currentStore} = this.props;
    const dict = currentStore.languages[currentStore.language];
    const emoj = ['😔', '😞', '😣', '😑', '😕', '😶', '☹️', '🙁'];

    return (
      <div>
        <SVGSprites />
        <div className='container'>
          <Header
            axios={this.props.axios}
            getPatterns={this.getPatterns.bind(this)}
            dict={dict}
          />
          <Menu
            getPatterns={this.getPatterns.bind(this)}
            currentStore={currentStore}
            appActions={this.props.appActions}
            dict={dict}
          />
          <div className='patterns'>
            {
              currentStore.filtredPattrens.length && this.state.isLoaded ? currentStore.filtredPattrens.map((obj, index) => (
                <Pattern
                  axios={this.props.axios}
                  getPatterns={this.getPatterns.bind(this)}
                  appActions={this.props.appActions}
                  store={currentStore}
                  key={index}
                  obj={obj}
                />
              )) :
              (
              this.state.isLoaded ?
                <div className='patterns__no-result'>
                  <h2>{dict.searchResult.notFoundTitle} { emoj[Math.floor(Math.random() * emoj.length)] }</h2>
                  <p>{dict.searchResult.notFoundText}</p>
                </div>
              :
                <div className='patterns__no-result'>
                  <p>{dict.loadingLabel}</p>
                </div>
              )
            }
          </div>
          <Footer dict={dict} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentStore: state.currentStore
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
