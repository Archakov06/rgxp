import React, { Component, } from 'react';

export default class Footer extends Component {

  constructor(){
    super();
  }

  render(){
    return (
      <div className="footer">
        <ul>
          <li>
            <span>© 2017 RegExp.Ru</span>
          </li>
          {
            this.props.dict.footer.links.map((item, index)=>
              <li key={index}>
                <a href={item.url}>{item.label}</a>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}
