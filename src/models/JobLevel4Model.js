import { BaseModel } from "./MainModel";

export default class JobLevel4Model extends BaseModel {
  async getJobLevel4By(data) {
    return this.authFetch({
      url: "joblevel4/getJobLevel4By",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateJobLevel4By(data) {
    return this.authFetch({
      url: "joblevel4/updateJobLevel4By",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async insertJobLevel4(data) {
    return this.authFetch({
      url: "joblevel4/insertJobLevel4",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteJobLevel4ByCode(data) {
    return this.authFetch({
      url: "joblevel4/deleteJobLevel4ByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
