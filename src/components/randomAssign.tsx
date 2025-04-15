import React, { useState } from "react";
import { Vehicle } from "../types/Vehicle";
import { generateRandomVehicle } from "../utils/vehicle";
import { State, Action } from "../hooks/useFerryTerminal";
// import { getRandomVehicle } from "../types/Vehicle";

interface Props {
  // Application state containing ferry data
  state: State;
  // Dispatch function for managing ferry actions
  dispatch: React.Dispatch<Action>;
  queue: Vehicle[];
  setQueue: React.Dispatch<React.SetStateAction<Vehicle[]>>;
}

const MAX_SMALL = 8;
const MAX_LARGE = 6;

const RandomAssign: React.FC<Props> = ({ state, dispatch, setQueue }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isFerryFull = (size: "small" | "large") => {
    if (size === "small") return state.smallFerry.length >= MAX_SMALL;
    return state.largeFerry.length >= MAX_LARGE;
  };

  const handleAddVehicle = () => {
    const vehicle = generateRandomVehicle();

    if (isFerryFull(vehicle.size)) {
      setQueue((prev) => [...prev, vehicle]);
      setErrorMessage("The ferry is full and the vehicle has joined the queue !");
      return;
    }

    setErrorMessage(null);
    dispatch({ type: "ADD_VEHICLE", payload: vehicle });
  };

  return (
    <div className="space-y-4">
      <button
        className="btn btn-accent w-full"
        onClick={handleAddVehicle}
      >
        Randomly add vehicles
      </button>
      {errorMessage && <div className="alert alert-error mt-2">{errorMessage}</div>}
    </div>
  );
};

export default RandomAssign;