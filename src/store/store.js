import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducers from './reducers';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
const middleware = applyMiddleware(thunk);
let store = null;

if (process.env.REACT_APP_NODE_ENV === 'production') {
  store = createStore(persistedReducer, middleware);
} else {
  store = createStore(
    persistedReducer,
    process.env.REACT_APP_NODE_ENV === 'production' ? middleware : composeWithDevTools(middleware)
  );
}
const persistor = persistStore(store);

export { store, persistor };
