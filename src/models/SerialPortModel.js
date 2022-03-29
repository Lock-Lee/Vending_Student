import { BaseModel } from "./MainModel";

export default class ProductModel extends BaseModel {
  async gettest(data) {
    return this.authFetch({
      url: "restart",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getDevice(data) {
    return this.authFetch({
      url: "test",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
