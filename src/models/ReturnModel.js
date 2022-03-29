import { BaseModel } from "./MainModel";

export default class ReturnModel extends BaseModel {

  async getReturnByUsercode(data) {
    return this.authFetch({
      url: "return/getReturnByUsercode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getReturnLastCode(data) {
    return this.authFetch({
      url: "return/getReturnLastCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async insertReturn(data) {
    return this.authFetch({
      url: "return/insertReturn",
      method: "POST",
      body: JSON.stringify(data),
    });
  }



}
