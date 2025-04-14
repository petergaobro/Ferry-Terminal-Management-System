import React from "react";

interface Props {
  state: any; // Contains terminalRevenue and workerRevenue
}

/**
 * RevenuePanel component displays the revenue statistics for both the terminal and the worker.
 */
const RevenuePanel: React.FC<Props> = ({ state }) => (
  <div className="card bg-white text-black shadow mt-4">
    <div className="card-body">
      <h3 className="card-title">Revenue Summary</h3>
      <p className="text-lg font-bold">Terminal Revenue: ${state.terminalRevenue.toFixed(2)}</p>
      <p className="text-lg font-bold">Worker Revenue: ${state.workerRevenue.toFixed(2)}</p>
    </div>
  </div>
);

export default RevenuePanel;
