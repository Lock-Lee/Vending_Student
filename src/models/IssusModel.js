import { BaseModel } from "./MainModel";

export default class IssusModel extends BaseModel {
  async getIssusLastCode(data) {
    return this.authFetch({
      url: "Issus/getIssusLastCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getIssusBy(data) {
    return this.authFetch({
      url: "Issus/getIssusBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getIssusByCode(data) {
    return this.authFetch({
      url: "Issus/getIssusByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async insertIssus(data) {
    return this.authFetch({
      url: "Issus/insertIssus",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getIssusByUserCode(data) {
    return this.authFetch({
      url: "Issus/getIssusByUserCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
