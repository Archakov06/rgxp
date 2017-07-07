import React, {Component, PropTypes} from 'react';
import {SVGLink} from '../components/SVGSprites';

export default class Header extends Component {

  static propTypes = {
    getPatterns: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };
    this.getPatterns = this.props.getPatterns;
  }

  getAllPatterns() {
    document.querySelector('#search-input').value = '';
    setTimeout(this.getPatterns.bind('', ''));
  }

  tagsHandle(tags) {
    this.setState({tags: tags});
    document.querySelector('.addForm__group input[id="addform-tags"]').classList = '';
  }

  render() {

    return (
      <div>
        <div className="header">
          <div className='header__logo'>
            <a href='javascript://' onClick={this.getAllPatterns.bind(this)}><SVGLink name='logo' /></a>
          </div>
        </div>
      </div>
    )
  }
}
