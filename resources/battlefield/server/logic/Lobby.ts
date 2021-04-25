import { Player } from "alt-server";
import { LobbyState } from "../enum";

export class Lobby {
  private _name: string;
  private _maxPlayer: number;
  private _minPlayer: number;
  private _owner: Player;
  private _playerList: Player[] = [];
  private _state: LobbyState;

  constructor(name: string, minPlayer: number, maxPlayer, owner: Player) {
    this._name = name;
    this._maxPlayer = maxPlayer;
    this._minPlayer = minPlayer;
    this._owner = owner;
    this._playerList.push(owner);
    this._state = LobbyState.Open;
  }

  addUser(player: Player): void {
    const playerIndex = this.indexForPlayer(player);
    if (playerIndex !== -1) return;
    this._playerList.push(player);
  }

  deleteUser(player: Player): void {
    const playerIndex = this.indexForPlayer(player);
    if (playerIndex === -1) return;
    this._playerList.splice(playerIndex, 1);
    if (player === this._owner) {
      if (this._playerList.length > 0) this._owner = this._playerList[0];
    }
  }

  get getCurrentUserCount(): number {
    return this._playerList.length;
  }

  get getName(): string {
    return this._name;
  }

  get getMaxUserCount(): number {
    return this._maxPlayer;
  }

  indexForPlayer(player: Player) {
    return this._playerList.indexOf(player);
  }

  setName(name: string) {
    this._name = name;
  }
}
