import { BaseModel } from "./MainModel";

export default class ProductMenuModel extends BaseModel {

  async getProductMenuAll(data) {
    return this.authFetch({
      url: "product-menu/getProductMenuAll",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getProductMenuBy(data) {
    return this.authFetch({
      url: "product-menu/getProductMenuBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async insertProductMenu(data) {
    return this.authFetch({
      url: "product-menu/insertProductMenu",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getProductMenuByCode(data) {
    return this.authFetch({
      url: "product-menu/getProductMenuByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateProductMenuByCode(data) {
    return this.authFetch({
      url: "product-menu/updateProducMenuByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteProductMenutByCode(data) {
    return this.authFetch({
      url: "product-menu/deleteProductMenuByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }


  // async getProductByData(data) {
  //   return this.authFetch({
  //     url: "product/getProductByData",
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   });
  // }

}
