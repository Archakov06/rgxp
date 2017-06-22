import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/appActions';

import Block from '../components/Block';
import Menu from '../components/Menu';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Pattern from '../components/Pattern';
import Button from '../components/Button';

import {SVGLink, SVGSprites} from '../components/SVGSprites';

class App extends Component {

  constructor(){
    super();
    this.state = {
      isLoaded: false,
    }
  }

  getPatterns(tag = ''){
    const { setAction } = this.props.appActions;
    const { currentStore } = this.props;
    this.props.axios.get(`https://594bb8b2ba07670011435299.mockapi.io/patterns${tag ? '?search=' + tag : ''}`)
    .then(function (response) {
      setAction('SET_PATTERNS', response.data);
      setAction('SET_TAG', tag);
      this.setState({
        isLoaded: true
      });
    }.bind(this))
    .catch(function (error) {
      console.error(error);
    });
  }

  componentWillMount(){
    this.getPatterns();
  }

  render() {

    const { currentStore } = this.props;
    const dict = this.props.currentStore.languages[this.props.currentStore.language];
    const emoj = ['😔','😞','😣','😑','😕','😶','☹️','🙁','🤷','🤦'];

    return (
      <div>
        <SVGSprites />
        <div className="container">
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
          <div className="patterns">
            {
              currentStore.filtredPattrens.length && this.state.isLoaded ? currentStore.filtredPattrens.map((obj, index)=>{
                return (
                  <Pattern
                    axios={this.props.axios}
                    getPatterns={this.getPatterns.bind(this)}
                    appActions={this.props.appActions}
                    key={index}
                    obj={obj}
                  />
                )
              }) :
              (
              this.state.isLoaded ?
                <div className="patterns__no-result">
                  <h2>{dict.searchResult.notFoundTitle} { emoj[Math.floor(Math.random() * emoj.length)] }</h2>
                  <p>{dict.searchResult.notFoundText}</p>
                </div>
              :
                <div className="patterns__no-result">
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

function mapStateToProps (state) {
  return {
    currentStore: state.currentStore
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
