import { IBaseSpawnInfo, IVehicleModKit } from "./";

export interface IVehicleSpawnInfo extends IBaseSpawnInfo {
  name: string;
  modKit?: any;
}
