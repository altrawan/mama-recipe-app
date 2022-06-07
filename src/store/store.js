import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import promiseMiddleware from 'redux-promise-middleware';
import storage from 'redux-persist/lib/storage';
import rootReducers from './reducers';

const persistConfig = {
  key: 'root',
  storage
};

const persitedReducer = persistReducer(persistConfig, rootReducers);
const store = createStore(persitedReducer, applyMiddleware(promiseMiddleware, logger));
const persistor = persistStore(store);

export { store, persistor };
