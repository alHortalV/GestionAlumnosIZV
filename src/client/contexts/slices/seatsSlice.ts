import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Seat } from '../../types/types';

interface SeatsState {
  seats: Seat[];
}

const initialState: SeatsState = {
  seats: [],
};

const seatsSlice = createSlice({
  name: 'seats',
  initialState,
  reducers: {
    setSeats: (state, action: PayloadAction<Seat[]>) => {
      state.seats = action.payload;
    },
    updateSeat: (state, action: PayloadAction<Seat>) => {
      const index = state.seats.findIndex(seat => seat.seatNumber === action.payload.seatNumber);
      if (index !== -1) {
        state.seats[index] = action.payload;
      }
    },
  },
});

export const { setSeats, updateSeat } = seatsSlice.actions;
export default seatsSlice.reducer;