import {
  createCamWithParams,
  destroyCam,
  displayRadar,
  renderScriptCams,
  setCamActiveWithInterp,
  setCamCoord,
  setCamFov,
  setCamRot,
  setFocusEntity,
  setFocusPosAndVel,
} from "natives";
import { ICoords } from "../interfaces/ICoords";
import { on, Player } from "alt-client";

export class Camera {
  private cam: number | null;
  private pos: ICoords;
  private rot: ICoords;
  private fov: number;
  private localPlayer: Player;

  public constructor() {
    this.cam = null;
    this.pos = { x: 0, y: 0, z: 0 };
    this.rot = { x: 0, y: 0, z: 0 };
    this.fov = 0;

    this.localPlayer = Player.local;
  }

  public create(
    posX: number,
    posY: number,
    posZ: number,
    rotX: number,
    rotY: number,
    rotZ: number,
    fov: number
  ) {
    if (this.cam !== null) {
      destroyCam(this.cam, true);
    }
    this.cam = createCamWithParams(
      "DEFAULT_SCRIPTED_CAMERA",
      (this.pos.x = posX),
      (this.pos.y = posY),
      (this.pos.z = posZ),
      (this.rot.x = rotX),
      (this.rot.y = rotY),
      (this.rot.z = rotZ),
      (this.fov = fov),
      true,
      2
    );
    renderScriptCams(true, false, 0, false, false, false);
    setFocusPosAndVel(this.pos.x, this.pos.y, this.pos.z, 0, 0, 0);
    displayRadar(false);
  }

  public getPos() {
    if (this.cam === null) return null;
    return this.pos;
  }

  public regRot() {
    if (this.cam === null) return null;
    return this.rot;
  }

  public getFov() {
    if (this.cam === null) return null;
    return this.fov;
  }

  public setPos(v: ICoords) {
    if (this.cam === null) return;
    setCamCoord(
      this.cam,
      (this.pos.x = v.x),
      (this.pos.y = v.y),
      (this.pos.z = v.z)
    );
    setFocusPosAndVel(this.pos.x, this.pos.y, this.pos.z, 0, 0, 0);
  }

  public setRot(v: ICoords) {
    if (this.cam === null) return;
    setCamRot(
      this.cam,
      (this.rot.x = v.x),
      (this.rot.y = v.y),
      (this.rot.z = v.z),
      2
    );
  }

  public setFov(v: number) {
    if (this.cam === null) return;
    setCamFov(this.cam, (this.fov = v));
  }

  public animateTo(
    pos: ICoords,
    rot: ICoords,
    fov: number,
    duration: number = 1000
  ) {
    if (this.cam === null) return;
    const tmp = createCamWithParams(
      "DEFAULT_SCRIPTED_CAMERA",
      pos.x,
      pos.y,
      pos.z,
      rot.x,
      rot.y,
      rot.z,
      fov,
      true,
      2
    );
    setCamActiveWithInterp(tmp, this.cam, duration, 0, 0);
    destroyCam(this.cam, true);
    this.cam = tmp;
    this.pos = pos;
    this.rot = rot;
    this.fov = fov;
  }

  public delete() {
    if (this.cam === null) return;
    displayRadar(true);
    renderScriptCams(false, false, 0, false, false, false);
    setFocusEntity(this.localPlayer.scriptID);
    destroyCam(this.cam, true);
    this.cam = null;
  }
}
