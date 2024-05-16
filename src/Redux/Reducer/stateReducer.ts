// stateReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define your initial state
interface State {
  // Define your state properties here
}

const initialState: State = {
  // Initial state values
};

// Create a slice
const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    // Define your reducer functions here
  },
});

// Export the reducer and action creators
export const { reducer, actions } = stateSlice;

// Export any specific action creators if needed
export const { /* specific action creators */ } = actions;

// Export the reducer by default
export default reducer;
