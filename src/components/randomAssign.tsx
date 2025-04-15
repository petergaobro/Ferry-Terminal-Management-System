import React from "react";
import { AssignProps } from "../types/Assign";
import { useVehicleAssign } from "../hooks/useVehicleAssign";
// import { generateRandomVehicle } from "../utils/vehicle";
import { getRandomVehicle } from "../utils/vehicle";

const RandomAssign: React.FC<AssignProps> = ({ state, dispatch, queue, setQueue }) => {
  // Custom hook for handling add vehicle logic and managing error state
  const { handleAddVehicle, errorMessage } = useVehicleAssign({ state, dispatch, queue, setQueue });
  const handleRandomAdd = () => {
    const vehicle = getRandomVehicle();
    handleAddVehicle(vehicle);
  };
  return (
    <div className="space-y-4">
      <button className="btn btn-accent w-full" onClick={handleRandomAdd}>
        Randomly add vehicles
      </button>
      {errorMessage && <div className="alert alert-error mt-2">{errorMessage}</div>}
    </div>
  );
};

export default RandomAssign;
