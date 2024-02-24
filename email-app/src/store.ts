import { configureStore } from '@reduxjs/toolkit'; 
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { 
persistReducer,
persistStore,
FLUSH, 
REHYDRATE,
PAUSE, 
PERSIST, 
PURGE, 
REGISTER 
} from 'redux-persist';
import userApi from './features/auth/authAPI';
import userReducer from './features/auth/userSlice';

const persistConfig = {
    key: 'root',
    storage,
};

/**
 * A reducer that combines all of the reducers for the app.
 */
const rootReducer = combineReducers({
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
});

/**
 * A reducer that persists the root reducer to local storage.
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * A store that uses the persisted reducer and the userApi middleware.
 */
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
    })
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store);