import React from 'react';
import { compose, lifecycle } from 'recompose';
import { withRouter } from 'react-router';

import Menu from './Menu';
import Header from './Header';
import Footer from './Footer';
import { Pattern, PatternPlaceholder } from './Pattern';
import { SVGSprites } from './SVGSprites';

const App = ({
  dict,
  searchQuery,
  isLoading,
  patterns,
  language,
  searchPatterns,
  history,
}) => {
  const emoj = ['😔', '😞', '😣', '😑', '😕', '😶', '☹️', '🙁'];

  return (
    <div>
      <SVGSprites />
      <div className="container">
        <Header searchPatterns={searchPatterns} dict={dict} history={history} />
        <Menu
          searchPatterns={searchPatterns}
          currentTag={searchQuery}
          dict={dict}
          history={history}
        />
        <div className="patterns">
          {patterns.length && !isLoading
            ? patterns.map((obj, index) => (
                <Pattern
                  key={'pattern-block-' + index}
                  language={language}
                  obj={obj}
                  dict={dict}
                  history={history}
                />
              ))
            : ''}
          {!patterns.length && !isLoading ? (
            <div className="patterns__no-result">
              <h2>
                {dict.searchResult.notFoundTitle}{' '}
                {emoj[Math.floor(Math.random() * emoj.length)]}
              </h2>
              <p>{dict.searchResult.notFoundText}</p>
            </div>
          ) : (
            ''
          )}
          {!patterns.length && isLoading
            ? [...Array(10).keys()].map(o => (
                <PatternPlaceholder key={'placeholder-block-' + o} />
              ))
            : ''}
        </div>
        <Footer dict={dict} />
      </div>
    </div>
  );
};

export default compose(
  withRouter,
  lifecycle({
    componentDidMount() {
      const { history, searchPatterns } = this.props;
      if (history.location.search.indexOf('search=') >= 0) {
        const query = history.location.search.split('search=')[1];
        searchPatterns(query);
      }
      history.listen(location =>
        searchPatterns(location.search.split('search=')[1]),
      );
    },
  }),
)(App);
