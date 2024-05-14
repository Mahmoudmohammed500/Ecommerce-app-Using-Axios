import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import categories from "./category/categorySlice";
import products from "./product/productSlice";
import cart from "./cart/cartSlice";
import global from "./global/globalSlice";
import auth from "./auth/authSlice";

const rootPersistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["cart"],
};

const authPersistConfig = {
  key: "auth",
  storage: storage,
  blacklist: ["loading", "error", "actType"],
};

const rootReducer = combineReducers({
  categories,
  products,
  cart,
  global,
  auth: persistReducer(authPersistConfig, auth),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };