import React from "react";
import { Vehicle } from "../types/Vehicle";
import { VehicleImages } from "../types/Vehicle";

interface QueueProps {
  queue: Vehicle[];
}

const QueueList: React.FC<QueueProps> = ({ queue }) => (
  <div className="card bg-white mt-4 text-black">
    <div className="card-body">
      <h3 className="card-title">Queue vehicles process</h3>
      <div className="flex gap-2 flex-wrap">
        {queue.map((v, i) => (
          <div key={`queue-${i}`} className="relative group">
            {/* Vehicle image */}
            <img src={VehicleImages[v.type]} alt={v.type} className="w-16 h-16 object-contain opacity-70" />
            {/* Optional label */}
            <p>{v.type}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default QueueList;
