import carImg from "../assets/car.png";
import vanImg from "../assets/van.png";
import truckImg from "../assets/truck.png";
import busImg from "../assets/bus.png";

export type VehicleSize = "small" | "large";
export type VehicleType = "car" | "van" | "truck" | "bus";

export type Vehicle = {
  size: VehicleSize;
  type: VehicleType;
};

export const VehicleTypes: VehicleType[] = ["car", "van", "truck", "bus"];

export const VehicleImages: Record<VehicleType, string> = { car: carImg, van: vanImg, truck: truckImg, bus: busImg };


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
