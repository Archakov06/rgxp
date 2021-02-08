import produce, { Draft } from 'immer';
import { Actions, ActionTypes } from './actions';
import patternsArr from '../assets/patterns.json';

export interface State {
  items: Pattern[];
  searchValue: string;
  isLoaded: boolean;
  lang: 'en' | 'ru';
}

export interface Pattern {
  title: Record<State['lang'], string>;
  description: Record<State['lang'], string>;
  pattern: string;
  placeholder: string;
  tags: string;
  nickname: string;
  priority: number;
}

export const initialState: State = {
  items: patternsArr,
  searchValue: '',
  isLoaded: false,
  lang: window.navigator.language.split('-')[0] as State['lang'],
};

export const reducer = produce((draftState: Draft<State>, action: Actions) => {
  switch (action.type) {
    case ActionTypes.SET_ITEMS:
      draftState.items = action.payload;
      break;

    case ActionTypes.SET_SEARCH_VALUE:
      draftState.searchValue = action.payload;
      break;

    case ActionTypes.CLEAR_FILTERS:
      draftState.searchValue = '';
      break;

    default:
      break;
  }
}, initialState);
