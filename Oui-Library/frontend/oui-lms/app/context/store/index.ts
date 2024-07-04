import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducers/auth";
import { initialData } from "../clientStorage/save";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("data-token");
    if (serializedState === null) {
      return initialData;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialData;
  }
};

// Save state to localStorage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("data-token", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if needed
});

// Create Redux store with persisted state
const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
  // Optionally, you can provide middleware or other options here
});

// Subscribe to store changes and save state to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
