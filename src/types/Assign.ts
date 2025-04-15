// types/Assign.ts
import { State, Action } from "../hooks/useFerryTerminal";
import { Vehicle } from "./Vehicle";

export interface AssignProps {
  // Shared application state (could replace 'any' with a more specific type if available)
  state: State;
  // Reducer dispatch function for updating state
  dispatch: React.Dispatch<Action>;
  queue: Vehicle[];
  setQueue: React.Dispatch<React.SetStateAction<Vehicle[]>>;
}
