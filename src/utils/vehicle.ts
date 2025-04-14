import { Vehicle, VehicleSize, VehicleType } from "../types/Vehicle";

// Randomly generate vehicle tool function
export const generateRandomVehicle = (): Vehicle => {
  const vehicleTypes: VehicleType[] = ["car", "van", "truck", "bus"];
  const randomType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
  const size: VehicleSize = randomType === "car" || randomType === "van" ? "small" : "large";

  return { type: randomType, size };
};
