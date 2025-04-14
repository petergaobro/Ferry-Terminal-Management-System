import React from "react";
import VehicleCard from "./vehicleCard";
import { Vehicle } from "../types/Vehicle";

interface Props {
  state: any; // Application state containing ferry data
  dispatch: Function; // Dispatch function for managing ferry actions
}

/**
 * FerryList component displays the small and large ferry sections.
 * Each ferry holds a list of vehicles represented as cards.
 */
const FerryList: React.FC<Props> = ({ state, dispatch }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
    {/* Small Ferry Section */}
    <div className="card bg-white shadow">
      <div className="card-body">
        <h3 className="card-title">Small Ferry</h3>
        <div className="flex gap-2 flex-wrap">
          {state.smallFerry.map((v: Vehicle, i: number) => (
            <VehicleCard key={`small-${i}`} vehicle={v} ferryType="small" index={i} dispatch={dispatch} />
          ))}
        </div>
      </div>
    </div>

    {/* Large Ferry Section */}
    <div className="card bg-white shadow">
      <div className="card-body">
        <h3 className="card-title">Large Ferry</h3>
        <div className="flex gap-2 flex-wrap">
          {state.largeFerry.map((v: Vehicle, i: number) => (
            <VehicleCard key={`large-${i}`} vehicle={v} ferryType="large" index={i} dispatch={dispatch} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default FerryList;
