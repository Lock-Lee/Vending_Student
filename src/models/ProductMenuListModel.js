import { BaseModel } from "./MainModel";

export default class ProductMenuListModel extends BaseModel {

  async getproductMenuListBy(data) {
    return this.authFetch({
      url: "product-menulist/getproductMenuListBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getproductMenuListByCode(data) {
    return this.authFetch({
      url: "product-menulist/getproductMenuListByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getProductByProductMenuName(data) {
    return this.authFetch({
      url: "product-menulist/getProductByProductMenuName",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async InsertORUpdateProductListMenu(data) {
    return this.authFetch({
      url: "product-menulist/InsertORUpdateProductListMenu",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteProductMenutlistByCode(data) {
    return this.authFetch({
      url: "product-menulist/deleteProductMenutlistByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // async getProductMenuByCode(data) {
  //   return this.authFetch({
  //     url: "product-menu/getProductMenuByCode",
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   });
  // }

  // async updateProductMenuByCode(data) {
  //   return this.authFetch({
  //     url: "product-menu/updateProducMenuByCode",
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   });
  // }



}
