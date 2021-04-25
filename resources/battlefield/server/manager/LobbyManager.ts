import { log, on, setInterval, Player } from "alt-server";
import { Lobby, Maps } from "../logic";

const lobbySystem: Lobby[] = [];
let lobbyCheck: number;

let mapSystem: Maps;

on("resourceStart", (errored) => {
  if (errored) {
    log("=> Resource started with errors, please check logs");
    process.exit();
    return;
  }
  mapSystem = new Maps();
  lobbyCheck = setInterval(checkEmptyLobbies, 100);
  log("=> Resource started");
});

on("playerConnect", (player: Player) => {
  player.model = "mp_m_bogdangoon";
  player.spawn(0, 0, 72, 0);
});

on("playerDisconnect", (player: Player, reason: string) => {
  for (let currentLobby of lobbySystem) {
    currentLobby.deleteUser(player);
  }
});

function checkEmptyLobbies() {
  for (let i = 0; i < lobbySystem.length; i++) {
    if (lobbySystem[i].getCurrentUserCount > 0) continue;
    lobbySystem.splice(i, 1);
  }
}
