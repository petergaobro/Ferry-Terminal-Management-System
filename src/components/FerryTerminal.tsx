import React, { useEffect, useState } from "react";
import { useFerryTerminal } from "../hooks/useFerryTerminal";
import AddVehicle from "./addVehicle";
import FerryList from "./ferryList";
import RevenuePanel from "./revenuePanel";
import { Vehicle } from "../types/Vehicle";

const FerryTerminal: React.FC = () => {
  const [state, dispatch] = useFerryTerminal();
  const [queue, setQueue] = useState<Vehicle[]>([]);

  // Automatic processing of queued vehicles
  useEffect(() => {
    if (queue.length > 0) {
      const nextVehicle = queue[0];
      const isSmall = nextVehicle.size === "small";
      const maxSmall = 8;
      const maxLarge = 6;

      if ((isSmall && state.smallFerry.length < maxSmall) || (!isSmall && state.largeFerry.length < maxLarge)) {
        dispatch({ type: "ADD_VEHICLE", payload: nextVehicle });
        setQueue((prev) => prev.slice(1));
      }
    }
  }, [state.smallFerry, state.largeFerry, queue, dispatch]);

  return (
    <div className="font-sans text-center p-5 max-w-[1200px] mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Ferry Terminal Management System</h1>
      <AddVehicle state={state} dispatch={dispatch} queue={queue} setQueue={setQueue} />
      <FerryList state={state} dispatch={dispatch} />
      <RevenuePanel state={state} />
    </div>
  );
};

export default FerryTerminal;
