import { serviceForMap } from "../services/serviceForMap";
export const mapController = {
  initService() {
    serviceForMap.initMap();
  },
}