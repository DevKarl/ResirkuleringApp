import { productSearchService } from '../services/productSearchService';

export const productSearchController = {

  initService() {
    productSearchService.initQuagga();
  },


}