export const contextStore = {
  user: null,
  mapData: [],

  setUserData(user) {
    this.user = user;
  },

  getUserData() {
    return this.user;
  },

  setMapData(mapData) {
    this.mapData = mapData;
  },

  getMapData() {
    return this.mapData;
  }
};
