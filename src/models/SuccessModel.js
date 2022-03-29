import { BaseModel } from "./MainModel";

export default class SuccessModel extends BaseModel {
  async getSuccessLastCode(data) {
    return this.authFetch({
      url: "success/getSuccessLastCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getSuccessBy(data) {
    return this.authFetch({
      url: "success/getSuccessBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getSuccessByCode(data) {
    return this.authFetch({
      url: "success/getSuccessByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateSuccessBy(data) {
    return this.authFetch({
      url: "success/updateSuccessBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async insertSuccess(data) {
    return this.authFetch({
      url: "success/insertSuccess",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteSuccessByCode(data) {
    return this.authFetch({
      url: "success/deleteSuccessByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
