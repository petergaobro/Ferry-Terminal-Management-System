import React, { useMemo, useState } from "react";
import { Vehicle, VehicleType, VehicleTypes, VehicleSize } from "../types/Vehicle";
import { AssignProps } from "../types/Assign";
import { useVehicleAssign } from "../hooks/useVehicleAssign";

// ManualAssign component allows users to manually select and add a vehicle
const ManualAssign: React.FC<AssignProps> = ({ state, dispatch, queue, setQueue }) => {
  // Track selected vehicle type from dropdown
  const [vehicleType, setVehicleType] = useState<VehicleType>("car");

  // Determine vehicle size based on type
  const vehicleSize = useMemo<VehicleSize>(
    () => (vehicleType === "car" || vehicleType === "van" ? "small" : "large"),
    [vehicleType],
  );
  // Custom hook for handling add vehicle logic and managing error state
  const { handleAddVehicle, errorMessage } = useVehicleAssign({ state, dispatch, queue, setQueue });
  // Handle manual add button click
  const handleManualAdd = () => {
    const vehicle: Vehicle = { type: vehicleType, size: vehicleSize };
    handleAddVehicle(vehicle);
  };

  return (
    <div className="space-y-4 bg-white text-black p-6">
      <select
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value as VehicleType)}
        className="select select-bordered w-full text-black bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm"
      >
        {VehicleTypes.map((type) => (
          <option key={type} value={type}>
            {type === "car" ? "Car" : type === "van" ? "Van" : type === "truck" ? "Truck" : "Bus"}
          </option>
        ))}
      </select>

      <button className="btn btn-primary w-full" onClick={handleManualAdd}>
        Add New Vehicles
      </button>

      {errorMessage && (
        <div className="alert alert-error mt-2 text-black bg-red-100 border border-red-400">{errorMessage}</div>
      )}
    </div>
  );
};

export default ManualAssign;
