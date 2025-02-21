import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGetStatus, ISeats } from '../models/interfaces';
import { apiService } from '../API/apiService';
import { RootState } from '.';

export const getSeatsThunk = createAsyncThunk<ISeats[], string>('sliceGetSeats/getSeatsThunk', async (id: string) => {
  const response = await apiService.getSeats(id);
  return response.data;
});

const initialState: IGetStatus<ISeats[]> = {
  items: [],
  loading: false,
  error: false
};

export const sliceGetSeats = createSlice({
  name: 'sliceGetSeats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSeatsThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSeatsThunk.fulfilled, (state, action: PayloadAction<ISeats[]>) => {
        state.items = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(getSeatsThunk.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

export const sliceGetSeatsState = (state: RootState) => state.sliceGetSeats;
export default sliceGetSeats.reducer;