import React from 'react';

const Footer = ({dict}) => (
  <div className='footer'>
    <ul>
      <li>
        <span>© 2017 RGXP.RU</span>
      </li>
      {
        dict.footer.links.map((item, index)=>
          <li key={index}>
            <a href={item.url}>{item.label}</a>
          </li>
        )
      }
    </ul>
  </div>
);

export default Footer;
