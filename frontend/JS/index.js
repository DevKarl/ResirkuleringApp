import { mapController } from './controllers/mapController';
import { productSearchController } from './controllers/productSearchController';
import { uiController } from './controllers/UIcontroller';

export const appManager = {
  init() {
    mapController.initService();
    productSearchController.initService();
    uiController.initDOM();
  },
}

document.addEventListener("DOMContentLoaded", () => {
  appManager.init();
});
