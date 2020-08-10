const initialState = {
  patterns: [],
  searchQuery: '',
  tag: '',
  isLoading: true,
  isReady: false,
  language: (window.navigator.userLanguage || window.navigator.language).split('-')[0],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PATTERNS':
      return {
        ...state,
        patterns: action.payload,
        isLoading: false,
        isReady: true,
      };
    case 'SET_TAG':
      return {
        ...state,
        tag: action.payload,
      };
    case 'SEARCH_PATTERNS': {
      const searchQuery = action.payload ? action.payload.toLowerCase() : '';
      return {
        ...state,
        searchQuery,
      };
    }
    case 'SET_LOADING': {
      return {
        ...state,
        isLoading: action.payload,
        isReady: false,
      };
    }
    default:
      return state;
  }
};
