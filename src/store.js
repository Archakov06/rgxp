import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import logger from 'redux-logger';

export default function configureStore() {
  const store = createStore(
    rootReducer,
    process.env.NODE_ENV !== 'production' ? applyMiddleware(logger) : {},
  );

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
