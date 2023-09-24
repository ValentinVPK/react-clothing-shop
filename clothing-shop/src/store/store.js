import { compose, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const middlewares = [
  process.env.NODE_ENV === "development" && logger,
  thunk,
].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middlewares));

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

export const persistor = persistStore(store);
