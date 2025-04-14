// src/hooks/useFerryTerminal.ts
import { useReducer } from "react";
import { Vehicle } from "../types/Vehicle";
import costMap from "../constants/costMap";

// Define the structure of the reducer state
interface State {
  // Vehicles on the small ferry
  smallFerry: Vehicle[];
  // Vehicles on the large ferry
  largeFerry: Vehicle[];
  // Total terminal revenue
  terminalRevenue: number;
  // Total worker revenue
  workerRevenue: number;
  // Error message (if any)
  error: string;
}

// Define allowed actions: add vehicle or set error message
type Action = { type: "ADD_VEHICLE"; payload: Vehicle } | { type: "SET_ERROR"; payload: string };

// Initial default state of the ferry terminal
const initialState: State = { smallFerry: [], largeFerry: [], terminalRevenue: 0, workerRevenue: 0, error: "" };

// Reducer function to manage state transitions
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_VEHICLE": {
      const vehicle = action.payload;
      // Look up price from vehicle type
      const price = costMap[vehicle.type];

      // Handle small ferry logic
      if (vehicle.size === "small") {
        if (state.smallFerry.length >= 8) {
          // Limit reached: max 8 small vehicles
          return { ...state, error: "Small ferry is full" };
        }

        return {
          ...state,
          // Add to small ferry list
          smallFerry: [...state.smallFerry, vehicle],
          // 90% to terminal
          terminalRevenue: state.terminalRevenue + price * 0.9,
          // 10% to workers
          workerRevenue: state.workerRevenue + price * 0.1,
          error: "",
        };
      }

      // Handle large ferry logic
      if (state.largeFerry.length >= 6) {
        // Limit reached: max 6 large vehicles
        return { ...state, error: "Large ferry is full" };
      }

      return {
        ...state,
        // Add to large ferry list
        largeFerry: [...state.largeFerry, vehicle],
        terminalRevenue: state.terminalRevenue + price * 0.9,
        workerRevenue: state.workerRevenue + price * 0.1,
        error: "",
      };
    }

    case "SET_ERROR":
      // Manually set error message
      return { ...state, error: action.payload };

    default:
      // Fallback for unknown actions (no state change)
      return state;
  }
}

// Export custom hook using useReducer
export const useFerryTerminal = () => useReducer(reducer, initialState);
