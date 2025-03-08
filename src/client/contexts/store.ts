import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './slices/studentsSlice';
import seatsReducer from './slices/seatsSlice';

const store = configureStore({
  reducer: {
    students: studentsReducer,
    seats: seatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;