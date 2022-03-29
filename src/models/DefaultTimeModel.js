import { BaseModel } from "./MainModel";

export default class DefaultTime extends BaseModel {
  async insertDefaultTime(data) {
    return this.authFetch({
      url: "defaulttime/insertDefaultTime",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getDefaultTime(data) {
    return this.authFetch({
      url: "defaulttime/getDefaultTime",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
