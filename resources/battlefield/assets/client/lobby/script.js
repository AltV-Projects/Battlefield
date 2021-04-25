const app = new Vue({
  el: "#app",
  data() {
    return {
      lobbies: [
        {
          id: 1,
          name: "Dummylobby 1",
          map: "de_dust",
          state: 1,
          currentPlayer: 1,
          maxPlayer: 12,
        },
        {
          id: 2,
          name: "Dummylobby 2",
          map: "de_dust2",
          state: 3,
          currentPlayer: 4,
          maxPlayer: 8,
        },
      ],
      maps: ["Map 1", "Map 2", "Map 3", "Map 4"],
      lobbyView: 0,
      createLobby: {
        name: "",
        map: "",
        maxPlayer: 12,
      },
    };
  },
  methods: {
    getStatusByState(state) {
      switch (state) {
        case 1:
          return "Waiting for player";
        case 2:
          return "Starting";
        case 3:
          return "Running";
        case 4:
          return "Ended";
      }
    },
  },
});
