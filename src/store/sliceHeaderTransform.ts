import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

type State = {
  classSearch: string,
  classHeader: string,
  classTitle: string,
  classLine: string,
  transform: boolean,
  success: boolean
};

const initialState: State = {
  classSearch: 'search__widget',
  classHeader: 'header',
  classTitle: 'header__title',
  classLine: 'header__endline',
  transform: false,
  success: false
};

export const sliceHeaderTransform = createSlice({
  name: 'sliceHeaderTransform',
  initialState,
  reducers: {
    transformHeader: (state) => {
      state.classHeader = 'header__choice-train';
      state.classSearch = 'search__widget-choice';
      state.classTitle = 'hide-section';
      state.classLine = 'hide-section';
      state.transform = true;
      state.success = false;
    },
    transformHeaderToMain: (state) => {
      state.classSearch = 'search__widget';
      state.classHeader = 'header';
      state.classTitle = 'header__title';
      state.classLine = 'header__endline';
      state.transform = false;
      state.success = false;
    },
    transformHeaderSuccess: (state) => {
      state.success = true;
      state.classTitle = 'hide-section';
      state.classSearch = 'hide-section';
      state.classHeader = 'header__order-complete';
    }
  }
});

export const {
  transformHeader,
  transformHeaderToMain,
  transformHeaderSuccess
} = sliceHeaderTransform.actions;

export const sliceHeaderTransformState = (state: RootState) => state.sliceHeaderTransform
export default sliceHeaderTransform.reducer;