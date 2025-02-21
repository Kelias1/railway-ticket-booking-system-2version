import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGetStatus, IRoute, ISearchRoute } from '../models/interfaces';
import { apiService } from '../API/apiService';
import { RootState } from '.';

export const getRouteThunk = createAsyncThunk('sliceGetCity/getRouteThunk', async (route: ISearchRoute) => {
  const response = await apiService.getRoutes(route);
  return response.data;
});


const initialState: IGetStatus<IRoute | null> = {
  items: null,
  loading: false,
  error: false
};

export const sliceGetTrainList = createSlice({
  name: 'sliceGetTrainList',
  initialState,
  reducers: {
    clearRouteList: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRouteThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getRouteThunk.fulfilled, (state, action: PayloadAction<IRoute>)  => {
        state.loading = false;
        state.error = false;
        state.items = action.payload;
      })
      .addCase(getRouteThunk.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  }
});

export const {
  clearRouteList
} = sliceGetTrainList.actions;

export const sliceGetRouteState = (state: RootState) => state.sliceGetTrainList
export default sliceGetTrainList.reducer;