import { configureStore } from '@reduxjs/toolkit';
import sliceChoice from './sliceChoice';
import sliceGetCity from './sliceGetCity';
import sliceHeaderTransform from './sliceHeaderTransform';
import sliceGetTrainList from './sliceGetTrainList';
import sliceBarProgress from './sliceBarProgress';
import sliceFilter from './sliceFilter';
import sliceGetLastTickets from './sliceGetLastTickets';
import sliceGetSeats from './sliceGetSeats';
import slicePrice from './slicePrice';
import sliceOrder from './sliceOrder';
import slicePostOrder from './slicePostOrder';
import slicePostSubscribe from './slicePostSubscribe';
import sliceNotice from './sliceNotice';
import { apiService } from '../API/apiService';

export const store = configureStore({
  reducer: {
    sliceChoice,
    sliceGetCity,
    sliceHeaderTransform,
    sliceGetTrainList,
    sliceBarProgress,
    sliceFilter,
    sliceGetLastTickets,
    sliceGetSeats,
    slicePrice,
    sliceOrder,
    slicePostOrder,
    slicePostSubscribe,
    sliceNotice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: apiService,
      },
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;