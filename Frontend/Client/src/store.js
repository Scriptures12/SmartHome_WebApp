// store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/user/userSlice.js';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const preLoadedState = {
  user: {
  currentUser: null,
  loading: false,
  error: false,
  }
}

const appReducer = combineReducers({ 
  user: userReducer 
});

//Added AppReducer to aid in clearing persisted data
const rootReducer = (state, action) => {
  if (action.type === 'auth/clearResults') {
    // this applies to all keys defined in persistConfig(s)
    storage.removeItem('persist:root');

    state = {};
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  preLoadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
