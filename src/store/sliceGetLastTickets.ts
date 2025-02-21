import { IGetStatus, IItem } from '../models/interfaces';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '../API/apiService';
import { RootState } from '.';

export const getLastTicketsThunk = createAsyncThunk('sliceGetLastTickets/getLastTicketsThunk', async () => {
  const response = await apiService.getLastTickets();
  return response.data;
});

const initialState: IGetStatus<IItem[]> = {
  items: [],
  loading: false,
  error: false
};

export const sliceGetLastTickets = createSlice({
  name: 'sliceGetLastTickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLastTicketsThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getLastTicketsThunk.fulfilled, (state, actions: PayloadAction<IItem[]>) => {
        state.loading = true;
        state.error = false;
        state.items = actions.payload;
      })
      .addCase(getLastTicketsThunk.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  }
});

export const sliceGetLastTicketsState = (state: RootState) => state.sliceGetLastTickets
export default sliceGetLastTickets.reducer;