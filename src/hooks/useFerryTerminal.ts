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
  // Vehicles waiting in line
  queue: Vehicle[];
  // Error message (if any)
  error: string;
}

// Define allowed actions: add vehicle or set error message
type Action =
  // add vehicle
  | { type: "ADD_VEHICLE"; payload: Vehicle }
  // set error
  | { type: "SET_ERROR"; payload: string }
  // remove vehicle
  | { type: "REMOVE_VEHICLE"; payload: { ferryType: "small" | "large"; index: number; carType: string } };

// Initial default state of the ferry terminal
const initialState: State = {
  smallFerry: [],
  largeFerry: [],
  terminalRevenue: 0,
  workerRevenue: 0,
  queue: [],
  error: "",
};

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

    // Handles the logic for removing a vehicle from the ferry
    case "REMOVE_VEHICLE": {
      const { ferryType, index, carType } = action.payload; // Extract the ferry type, vehicle index, and car type
      const price = costMap[carType]; // Get the price associated with the vehicle type
      let queueVehicle: Vehicle | undefined; // Will store the vehicle selected from the queue

      // Handling for small ferry
      if (ferryType === "small") {
        const smallFerry = [...state.smallFerry]; // Clone the current small ferry list
        smallFerry.splice(index, 1); // Remove the vehicle at the specified index

        // Find the first suitable vehicle from the queue (size === "small")
        queueVehicle = state.queue.find((v) => v.size === "small");
        if (queueVehicle) {
          return {
            ...state,
            smallFerry: [...smallFerry, queueVehicle], // Add the queued vehicle to the small ferry
            queue: state.queue.filter((v) => v !== queueVehicle), // Remove the vehicle from the queue
            error: "", // Clear any error message
          };
        }

        // No suitable small vehicle found — apply penalty to revenue
        return {
          ...state,
          smallFerry,
          terminalRevenue: Math.max(state.terminalRevenue - price * 0.9, 0), // Deduct 90% from terminal revenue (prevent negative)
          workerRevenue: Math.max(state.workerRevenue - price * 0.1, 0), // Deduct 10% from worker revenue (prevent negative)
          error: "No suitable small vehicle available to add to ferry", // Set error message
        };
      } else {
        // Handling for large ferry
        const largeFerry = [...state.largeFerry]; // Clone the current large ferry list
        largeFerry.splice(index, 1); // Remove the vehicle at the specified index

        // Find the first suitable vehicle from the queue (size === "large")
        queueVehicle = state.queue.find((v) => v.size === "large");
        if (queueVehicle) {
          return {
            ...state,
            largeFerry: [...largeFerry, queueVehicle], // Add the queued vehicle to the large ferry
            queue: state.queue.filter((v) => v !== queueVehicle), // Remove the vehicle from the queue
            error: "", // Clear any error message
          };
        }

        // No suitable large vehicle found — apply penalty to revenue
        return {
          ...state,
          largeFerry,
          terminalRevenue: Math.max(state.terminalRevenue - price * 0.9, 0), // Deduct 90% from terminal revenue (prevent negative)
          workerRevenue: Math.max(state.workerRevenue - price * 0.1, 0), // Deduct 10% from worker revenue (prevent negative)
          error: "No suitable large vehicle available to add to ferry", // Set error message
        };
      }
    }

    default:
      // Fallback for unknown actions (no state change)
      return state;
  }
}

// Export custom hook using useReducer
export const useFerryTerminal = () => useReducer(reducer, initialState);
export type { State, Action };
