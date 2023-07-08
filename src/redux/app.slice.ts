// app.slice.ts

import { createSlice } from 'ngrx-slice';

export interface AppState {
  value: number;
  content: string
}

const initialState: AppState = {
  value: 1,
  content: "string"

};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    increaseValue: (state : AppState ) => {

      state.value += 1;
      console.log(state.value);
      
    },
  },
});

export const selectValue = (state: { app: AppState }) => state.app.value;