import React from "react";
import { useFerryTerminal } from "../hooks/useFerryTerminal";
import { getRandomVehicle } from "../types/Vehicle";

export const RandomAssign: React.FC = () => {
  const [state, dispatch] = useFerryTerminal();

  const onClick = () => {
    const vehicle = getRandomVehicle();
    dispatch({ type: "ADD_VEHICLE", payload: vehicle });
  };

  return (
    <>
      {/* Header Area */}
      <div className="bg-white p-6 shadow text-center">
        <h1 className="text-3xl font-bold text-black">Findex Dev test React - Peter Gao</h1>
        <p className="text-black">
          Instruction: Please put your name here, and remove the background color, to assist us with reviewing the
          project.
        </p>
        <p className="text-gray-600 text-sm mt-2">Click the button below to add a random vehicle to the ferry.</p>
        <button onClick={onClick} className="btn btn-primary mt-4">
          Add Random Vehicle
        </button>
        {/* Error message */}
        {state.error && (
          <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 mt-4 font-medium">
            {state.error}
          </div>
        )}
      </div>

      {/* Ferry Content */}
      <div className="bg-white p-6 shadow space-y-6">
        {/* Small ferry */}
        <div className="bg-gray-50 p-4 rounded shadow-sm">
          <h3 className="card-title text-neutral">Small Ferry</h3>
          <ul className="list-disc list-inside text-gray-700">
            {state.smallFerry.map((v, i) => (
              <li key={i}>
                {v.type} - {v.size}
              </li>
            ))}
          </ul>
        </div>

        {/* Large ferry */}
        <div className="bg-gray-50 p-4 rounded shadow-sm">
          <h3 className="card-title text-neutral">Large Ferry</h3>
          <ul className="list-disc list-inside text-gray-700">
            {state.largeFerry.map((v, i) => (
              <li key={i}>
                {v.type} - {v.size}
              </li>
            ))}
          </ul>
        </div>

        {/* Revenue */}
        <div className="bg-gray-50 p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">Revenue Statistics</h3>
          <p className="text-gray-800">Terminal Revenue: ${state.terminalRevenue.toFixed(2)}</p>
          <p className="text-gray-800">Worker Revenue: ${state.workerRevenue.toFixed(2)}</p>
        </div>
      </div>
    </>
  );
};
