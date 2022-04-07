import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import productsReducer from "./productsReducer";

const reducers = combineReducers({
  products: productsReducer,
});

const store = configureStore({
  reducer: reducers,
  devTools: true,
});

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
export default store;
