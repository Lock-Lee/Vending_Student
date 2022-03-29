import { BaseModel } from "./MainModel";

export default class ProductModel extends BaseModel {
  async getProductLastCode(data) {
    return this.authFetch({
      url: "product/getProductLastCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getProductBy(data) {
    return this.authFetch({
      url: "product/getProductBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getProductByCode(data) {
    return this.authFetch({
      url: "product/getProductByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateProductBy(data) {
    return this.authFetch({
      url: "product/updateProductBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async insertProduct(data) {
    return this.authFetch({
      url: "product/insertProduct",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteProductByCode(data) {
    return this.authFetch({
      url: "product/deleteProductByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getProductByGroup(data) {
    return this.authFetch({
      url: "product/getProductByGroup",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getProductALLByGroup(data) {
    return this.authFetch({
      url: "product/getProductALLByGroup",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getProductByData(data) {
    return this.authFetch({
      url: "product/getProductByData",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async checkProductByTransaction(data) {
    return this.authFetch({
      url: "product/checkProductByTransaction",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
