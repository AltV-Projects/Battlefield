import { IPlayerSpawnInfo, IVehicleSpawnInfo } from "../interfaces";
import playerSpawns from "../data/playerSpawns.json";
import vehicleSpawns from "../data/vehicleSpawns.json";

export class Maps {
  private _playerSpawns: IPlayerSpawnInfo[];
  private _vehicleSpawns: IVehicleSpawnInfo[];

  constructor() {
    this._playerSpawns = playerSpawns as IPlayerSpawnInfo[];
    this._vehicleSpawns = vehicleSpawns as IVehicleSpawnInfo[];
  }
}
