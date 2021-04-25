import { on, Player, showCursor, WebView } from "alt-client";
import { Camera } from "../logic";

// const localPlayer = Player.local;
let camHandle;
let view: WebView;

on("connectionComplete", () => {
  camHandle = new Camera();
  camHandle.create(1170.22, -248.8614, 295.4523, -15, 0, 45.9196, 50);
  view = new WebView("http://resource/client/lobby/index.html");
  showCursor(true);
});
