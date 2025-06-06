import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import mingleUserSliceReducer from './mingleUserSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: mingleUserSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Remove the App component from this file, as this file should only export the store and related types.