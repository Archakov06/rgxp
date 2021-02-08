import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Footer } from './components/Footer';

import { Header } from './components/Header';
import { StateContext } from './context';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { initialState, reducer } from './store/reducer';

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <StateContext.Provider value={{ ...state, dispatch }}>
            <Header />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/tags/:name" component={HomePage} />
              <Route component={NotFoundPage} />
            </Switch>
            <Footer />
          </StateContext.Provider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
