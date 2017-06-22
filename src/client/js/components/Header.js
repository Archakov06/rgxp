import React, { Component, } from 'react';
import Modal  from 'react-bootstrap-modal';

import {SVGLink} from '../components/SVGSprites';
import Button from '../components/Button';
import TagInput from '../components/TagInput';

export default class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      addModalShow: false,
      tags: [],
    }
  }

  getAllPatterns() {
    document.querySelector('#search-input').value = '';
    setTimeout(this.props.getPatterns.bind('', ''));
  }

  tagsHandle(tags){
    this.setState({tags: tags});
    document.querySelector('.addForm__group input[id="addform-tags"]').classList = '';
  }

  sendForm(){

    const self = this;
    const pattern = this.pattern.value[0] == '/' && this.pattern.value[this.pattern.value.length-1] == '/' ? this.pattern.value.slice(1,-1) : this.pattern.value;

    const params = {
      title: this.title.value,
      pattern: pattern,
      placeholder: this.placeholder.value,
      description: this.description.value,
      tags: this.state.tags,
    };

    this.props.axios.post(`patterns/add`, params).then(function (response){

      const status = response.data.status;
      const payload = response.data.payload;

      document.querySelectorAll('.addForm__group input').forEach((elem) => elem.classList = '');

      switch (status){
        case 'VALIDATOR_ERROR':
          payload.forEach((item) => document.getElementById(`addform-${item.param}`).classList = 'error');
        return;
        case 'ADD_PATTERN_ERROR':
          alert(payload.code);
        return;
      }

      self.setState({ addModalShow: false });

    }).catch(function (error){
      console.error(error);
    });

  }

  render(){

    let closeModal = () => this.setState({ addModalShow: false })
    let showModal = () => this.setState({ addModalShow: true })

    return (
      <div>

        <Modal
          show={this.state.addModalShow}
          onHide={closeModal}
          aria-labelledby="ModalHeader"
        >
          <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>{this.props.dict.addForm.boxTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="addForm">

              <div className="row">
                <div className="col-md">
                  <div className="addForm__group">
                    <span>{this.props.dict.addForm.boxTitleInput}</span>
                    <input ref={(input)=>this.title = input} id="addform-title" type="text"/>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md">
                  <div className="addForm__group">
                    <span>{this.props.dict.addForm.boxPatternInput}</span>
                    <input ref={(input)=>this.pattern = input} id="addform-pattern" type="text" placeholder={this.props.dict.addForm.boxPatternInputPlaceholder} />
                  </div>
                </div>
                <div className="col-md">
                  <div className="addForm__group">
                    <span>{this.props.dict.addForm.boxPlaceholderInput}</span>
                    <input ref={(input)=>this.placeholder = input} id="addform-placeholder" type="text" placeholder={this.props.dict.addForm.boxPlaceholderInputPlaceholder} />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="addForm__group">
                    <span>{this.props.dict.addForm.boxDescriptionInput}</span>
                    <textarea ref={(input)=>this.description = input} id="addform-description" rows="10"></textarea>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md">
                  <div className="addForm__group addForm__group--tags">
                    <span>{this.props.dict.addForm.boxTagsInput}</span>
                    <TagInput
                      id="addform-tags"
                      onChange={this.tagsHandle.bind(this)}
                      placeholder={this.props.dict.addForm.tagPlaceholder}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeModal} className="white">{this.props.dict.addForm.closeBtn}</Button>
            <Button onClick={this.sendForm.bind(this)} className="green">{this.props.dict.addForm.addBtn}</Button>
          </Modal.Footer>
        </Modal>

        <div className="header">
          <div className="header__logo">
            <a href="javascript://" onClick={this.getAllPatterns.bind(this)}><SVGLink name="logo" /></a>
          </div>
          <div className="header__right">

            {/*
              <div className="header__language">
                <img src="/dist/img/flags/ru.png" />
                <span>Русский</span>
              </div>
            */}

            {/*
              <Button onClick={showModal} className="green">{this.props.dict.addForm.mainBtn}</Button>
            */}

          </div>
        </div>

      </div>
    )
  }
}
