import { Team, Type } from "../enum";

export interface IBaseSpawnInfo {
  x: number;
  y: number;
  z: number;
  Team: Team;
  Type: Type;
  MapID: number;
}
