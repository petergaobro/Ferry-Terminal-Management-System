export type VehicleSize = "small" | "large";
export type VehicleType = "car" | "van" | "truck" | "bus";

export type Vehicle = {
  size: VehicleSize;
  type: VehicleType;
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


// export type VehicleSize = "small" | "large";
// export type VehicleType = "car" | "van" | "truck" | "bus";

// export type Vehicle = {
//   size: VehicleSize;
//   type: VehicleType;
// };

// export const getRandomVehicle = (): Vehicle => {
//   const randomNumber = Math.floor(Math.random() * 4) + 1;

//   switch (randomNumber) {
//     case 1: {
//       return {
//         type: "car",
//         size: "small",
//       };
//     }
//     case 2: {
//       return {
//         type: "van",
//         size: "small",
//       };
//     }
//     case 3: {
//       return {
//         type: "truck",
//         size: "large",
//       };
//     }
//     default: {
//       return {
//         type: "bus",
//         size: "large",
//       };
//     }
//   }
// };
