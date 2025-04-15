import { Vehicle, VehicleSize } from "../types/Vehicle";
import { AssignProps } from "../types/Assign";
import { useState } from "react";

const MAX_SMALL = 8;
const MAX_LARGE = 6;

/**
 * Custom hook to manage vehicle assignment logic:
 * - Checks if the ferry is full
 * - Dispatches vehicle addition or queues it
 * - Handles error message state
 */
export const useVehicleAssign = ({ state, dispatch, setQueue }: AssignProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Checks if the target ferry is full based on the vehicle size
   */
  const isFerryFull = (size: VehicleSize): boolean => {
    if (size === "small") return state.smallFerry.length >= MAX_SMALL;
    return state.largeFerry.length >= MAX_LARGE;
  };

  /**
   * Tries to add a vehicle to the appropriate ferry
   * If full, adds to queue and sets an error message
   */
  const handleAddVehicle = (vehicle: Vehicle) => {
    if (isFerryFull(vehicle.size)) {
      setQueue((prev) => [...prev, vehicle]);
      setErrorMessage("The ferry is full and the vehicle has joined the queue.");
      return;
    }

    setErrorMessage(null);
    dispatch({ type: "ADD_VEHICLE", payload: vehicle });
  };

  return {
    isFerryFull,
    handleAddVehicle,
    errorMessage,
    setErrorMessage,
  };
};
