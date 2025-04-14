// QueueList.tsx
import React from "react";
import { Vehicle } from "../types/Vehicle";
import { vehicleImages } from "../constants/vehicleMap";

interface QueueProps {
  queue: Vehicle[];
}

const QueueList: React.FC<QueueProps> = ({ queue }) => (
  <div className="card bg-base-100 shadow mt-4">
    <div className="card-body">
      <h3 className="card-title">Queue vehicles process</h3>
      <div className="flex gap-2 flex-wrap">
        {queue.map((v, i) => (
          <img
            key={`queue-${i}`}
            src={vehicleImages[v.type]}
            alt={v.type}
            className="w-16 h-16 object-contain opacity-70"
          />
        ))}
      </div>
    </div>
  </div>
);

export default QueueList;