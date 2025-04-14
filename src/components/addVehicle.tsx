import React, { useState } from "react";
import ManualAssign from "./manualAssign";
import RandomAssign from "./randomAssign";
import { Vehicle } from "../types/Vehicle";

// Define expected props for the AddVehicle component
interface Props {
  // Shared application state (could replace 'any' with a more specific type if available)
  state: any;
  // Reducer dispatch function for updating state
  dispatch: Function;
  // Current list of queued vehicles
  queue: Vehicle[];
  // Function to update the queue
  setQueue: React.Dispatch<React.SetStateAction<Vehicle[]>>;
}

// AddVehicle component manages the mode (manual or random) of adding vehicles
const AddVehicle: React.FC<Props> = ({ state, dispatch, queue, setQueue }) => {
  const [mode, setMode] = useState<"manual" | "random">("manual"); // Track selected mode

  return (
    <div className="w-full max-w-3xl mx-auto bg-white text-black rounded-md">
      {/* Tab navigation for switching between modes */}
      <div className="tabs tabs-border w-full justify-center">
        {/* Manual add tab with daisyui tab component*/}
        <input
          type="radio"
          name="assign_mode"
          className="tab !text-black !bg-transparent"
          aria-label="Manual add"
          checked={mode === "manual"}
          onChange={() => setMode("manual")}
        />
        <div className="tab-content p-10">
          {mode === "manual" && <ManualAssign state={state} dispatch={dispatch} queue={queue} setQueue={setQueue} />}
        </div>

        {/* Random add tab with daisyui tab component*/}
        <input
          type="radio"
          name="assign_mode"
          className="tab !text-black !bg-transparent"
          aria-label="Random add"
          checked={mode === "random"}
          onChange={() => setMode("random")}
        />
        <div className="tab-content p-10">
          {mode === "random" && <RandomAssign dispatch={dispatch} queue={queue} setQueue={setQueue} state={state} />}
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
