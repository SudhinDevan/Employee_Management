import { configureStore } from "@reduxjs/toolkit";
import { Clientreducer } from "./Client";
import {persistStore , persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'admin' ,
    storage
}

const persistedClientreducer = persistReducer(persistConfig,Clientreducer);

export const store = configureStore({
    reducer: {
        Client:persistedClientreducer
    }
});

export const persistor = persistStore(store)