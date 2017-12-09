const initialState = {
  patterns: [],
  searchQuery: '',
  tag: '',
  isLoading: true,
  language:
    (window.navigator.userLanguage || window.navigator.language) === 'ru'
      ? 'ru'
      : 'en',
};

export default function currentStore(state = initialState, action) {
  switch (action.type) {
    case 'SET_PATTERNS':
      return {
        ...state,
        patterns: action.payload,
      };
    case 'SET_TAG':
      return {
        ...state,
        tag: action.payload,
      };
    case 'SEARCH_PATTERNS': {
      const val = action.payload ? action.payload.toLowerCase() : '';
      return {
        ...state,
        searchQuery: val,
      };
    }
    case 'SET_LOADING': {
      const isLoading = action.payload;
      return {
        ...state,
        isLoading,
      };
    }
    default:
      return state;
  }
}
