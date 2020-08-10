import { compose, withHandlers, withState, lifecycle, mapProps } from 'recompose';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as appActions from '../actions/appActions';

import axios from '../axios';
import language from '../language';

import App from '../components/App';

const lifecycleMethods = lifecycle({
  componentDidMount() {
    const { history, searchPatterns } = this.props;
    const search = history.location.search;
    if (search.indexOf('search=') >= 0) {
      const query = history.location.search.split('search=')[1];
      searchPatterns(query);
    }
    history.listen((location) => searchPatterns(location.search.split('search=')[1]));
  },
  componentWillMount() {
    const { fetchPatterns } = this.props;
    fetchPatterns();
  },
});

const handlers = withHandlers({
  fetchPatterns: ({ setPatterns }) => () => {
    axios
      .get('https://5b3757f86223c40014605837.mockapi.io/patterns')
      .then(({ data }) => {
        setPatterns(data);
      })
      .catch((error) => console.error(error));
  },
});

const replaceProps = mapProps((props) => ({
  ...props,
  dict: language[props.language],
  patterns: props.patterns.length
    ? props.patterns
        .filter((item) => {
          const searchQuery =
            props.location.search.indexOf('search=') >= 0
              ? props.location.search.split('search=')[1]
              : props.searchQuery;
          return (
            (item.title.hasOwnProperty(props.language) &&
              item.title[props.language].toLowerCase().indexOf(searchQuery) >= 0) ||
            item.tags.toLowerCase().indexOf(searchQuery) >= 0 ||
            (item.hasOwnProperty('description') &&
              item.description.hasOwnProperty(props.language) &&
              item.description[props.language].toLowerCase().indexOf(searchQuery) >= 0)
          );
        })
        .sort((a, b) => b.priority - a.priority)
    : [],
}));

export default compose(
  connect(({ currentStore }) => currentStore, appActions),
  withState('isLoaded', 'setLoading', true),
  withRouter,
  handlers,
  lifecycleMethods,
  replaceProps,
)(App);
