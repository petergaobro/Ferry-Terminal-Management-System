import carImg from "../assets/car.png";
import vanImg from "../assets/van.png";
import truckImg from "../assets/truck.png";
import busImg from "../assets/bus.png";
import { VehicleType } from "../types/Vehicle";

export const vehicleTypes: VehicleType[] = ["car", "van", "truck", "bus"];

export const vehicleImages: Record<VehicleType, string> = { car: carImg, van: vanImg, truck: truckImg, bus: busImg };
