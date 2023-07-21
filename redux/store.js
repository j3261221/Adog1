import {
    configureStore,
    combineReducers,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { UserSlice } from '../reducer/userSlice';

//1) config 작성
const persistConfig = {
    key: 'root',
    version: 0,
    storage,
};

//2) 슬라이스 결합
const rootReducer = combineReducers({
    userReducer: UserSlice.reducer,
});

//3) persistReducer로 감싸기
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: {
        persistedReducer,
    },

    //4) 미들웨어 설정
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store);

export default store;