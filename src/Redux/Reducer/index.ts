import { combineReducers } from '@reduxjs/toolkit';
import { reducer as someReducer } from './stateReducer'; // import your slices/reducers here

const rootReducer = combineReducers({
  someFeature: someReducer, // adjust this according to your reducer structure
  // Add more reducers here if you have them
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
