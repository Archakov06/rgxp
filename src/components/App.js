import React from 'react';
import { Route } from 'react-router-dom';

import Menu from './Menu';
import Header from './Header';
import Footer from './Footer';

import Home from './Home';
import AddForm from './AddForm';

const App = (props) => {
  const { dict, searchQuery, searchPatterns, history } = props;
  return (
    <div>
      <div className="container">
        <Header searchPatterns={searchPatterns} dict={dict} history={history} />
        <Menu
          searchPatterns={searchPatterns}
          currentTag={searchQuery}
          dict={dict}
          history={history}
        />
        <Route exact path="/" component={Home.bind(this, props)} />
        <Route path="/add" component={AddForm.bind(this, props)} />
        <Footer dict={dict} />
      </div>
    </div>
  );
};

export default App;
