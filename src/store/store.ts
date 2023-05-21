import { combineReducers, configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./slices/articleSlice";
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
  artickles: articlesReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;