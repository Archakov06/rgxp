import { Immutable } from 'immer';
import React from 'react';
import { Actions } from './store/actions';
import { initialState, State } from './store/reducer';

interface StateProps extends Immutable<State> {
  dispatch?: React.Dispatch<Actions>;
}

export const StateContext = React.createContext<StateProps>(initialState);
