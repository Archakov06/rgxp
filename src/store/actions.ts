import { Pattern } from './reducer';

export enum ActionTypes {
  CLEAR_FILTERS = 'CLEAR_FILTERS',
  SET_ITEMS = 'SET_ITEMS',
  SET_SEARCH_VALUE = 'SET_SEARCH_VALUE',
}

type SetItemsAction = {
  type: ActionTypes.SET_ITEMS;
  payload: Pattern[];
};

type SetSearchValueAction = {
  type: ActionTypes.SET_SEARCH_VALUE;
  payload: string;
};

type ClearFiltersAction = {
  type: ActionTypes.CLEAR_FILTERS;
};

export const setItems = (payload: Pattern[]): SetItemsAction => ({
  type: ActionTypes.SET_ITEMS,
  payload,
});

export const setSearchValue = (payload: string): SetSearchValueAction => ({
  type: ActionTypes.SET_SEARCH_VALUE,
  payload,
});

export const clearFilters = (): ClearFiltersAction => ({
  type: ActionTypes.CLEAR_FILTERS,
});

export type Actions = SetItemsAction | SetSearchValueAction | ClearFiltersAction;
