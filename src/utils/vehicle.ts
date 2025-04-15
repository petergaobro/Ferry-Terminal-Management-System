import { Vehicle, VehicleSize, VehicleType } from "../types/Vehicle";

// Randomly generate vehicle tool function
export const generateRandomVehicle = (): Vehicle => {
  const vehicleTypes: VehicleType[] = ["car", "van", "truck", "bus"];
  const randomType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
  const size: VehicleSize = randomType === "car" || randomType === "van" ? "small" : "large";

  return { type: randomType, size };
};



// Define vehicle types and their corresponding dimensions (avoid duplication of logic)
const vehicleSizeMap: Record<VehicleType, VehicleSize> = {
  car: "small",
  van: "small",
  truck: "large",
  bus: "large",
};

const vehicleTypes: VehicleType[] = ["car", "van", "truck", "bus"];

export const getRandomVehicle = (): Vehicle => {
  const randomType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
  return {
    type: randomType,
    size: vehicleSizeMap[randomType],
  };
};