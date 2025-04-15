import React from "react";
import { Vehicle } from "../types/Vehicle";
import { VehicleImages } from "../types/Vehicle";
import { Action } from "../hooks/useFerryTerminal";

interface Props {
  vehicle: Vehicle;
  ferryType: "small" | "large";
  index: number;
  // Dispatch function for managing ferry actions
  dispatch: React.Dispatch<Action>;
}

const VehicleCard: React.FC<Props> = ({ vehicle, ferryType, index, dispatch }) => (
  <div className="relative group">
    <img
      src={VehicleImages[vehicle.type]}
      alt={vehicle.type}
      className="w-16 h-16 object-contain transition transform hover:scale-110"
    />
    <button
      onClick={() => dispatch({ type: "REMOVE_VEHICLE", payload: { ferryType, index, carType: vehicle.type } })}
      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs hidden group-hover:block cursor-pointer"
    >
      X
    </button>
  </div>
);

export default VehicleCard;
