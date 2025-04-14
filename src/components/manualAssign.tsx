import React, { useMemo, useState } from "react";
import { Vehicle, VehicleType, VehicleSize } from "../types/Vehicle";

interface Props {
  state: any;
  dispatch: Function;
  queue: Vehicle[];
  setQueue: React.Dispatch<React.SetStateAction<Vehicle[]>>;
}

const vehicleTypes: VehicleType[] = ["car", "van", "truck", "bus"];
const MAX_SMALL = 8;
const MAX_LARGE = 6;

const ManualAssign: React.FC<Props> = ({ state, dispatch, queue, setQueue }) => {
  const [vehicleType, setVehicleType] = useState<VehicleType>("car");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const vehicleSize = useMemo<VehicleSize>(
    () => (vehicleType === "car" || vehicleType === "van" ? "small" : "large"),
    [vehicleType],
  );

  const isFerryFull = (size: VehicleSize) => {
    if (size === "small") return state.smallFerry.length >= MAX_SMALL;
    return state.largeFerry.length >= MAX_LARGE;
  };

  const handleAddVehicle = () => {
    const vehicle: Vehicle = { type: vehicleType, size: vehicleSize };

    if (isFerryFull(vehicle.size)) {
      setQueue((prev) => [...prev, vehicle]);
      setErrorMessage("The ferry is full and the vehicle has joined the queue!");
      return;
    }

    setErrorMessage(null);
    dispatch({ type: "ADD_VEHICLE", payload: vehicle });
  };

  return (
    <div className="space-y-4 bg-white text-black p-6">
      <select
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value as VehicleType)}
        className="select select-bordered w-full text-black bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm"
      >
        {vehicleTypes.map((type) => (
          <option key={type} value={type}>
            {type === "car" ? "Car" : type === "van" ? "Van" : type === "truck" ? "Truck" : "Bus"}
          </option>
        ))}
      </select>

      <button className="btn btn-primary w-full" onClick={handleAddVehicle}>Add New Vehicles</button>

      {errorMessage && (
        <div className="alert alert-error mt-2 text-black bg-red-100 border border-red-400">{errorMessage}</div>
      )}
    </div>
  );
};

export default ManualAssign;
