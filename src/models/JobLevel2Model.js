import { BaseModel } from "./MainModel";

export default class JobLevel2Model extends BaseModel {
  async getJobLevel2By(data) {
    return this.authFetch({
      url: "joblevel2/getJobLevel2By",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getJobLevel2ByCode(data) {
    return this.authFetch({
      url: "joblevel2/getJobLevel2ByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateJobLevel2By(data) {
    return this.authFetch({
      url: "joblevel2/updateJobLevel2By",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async insertJobLevel2(data) {
    return this.authFetch({
      url: "joblevel2/insertJobLevel2",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteJobLevel2ByCode(data) {
    return this.authFetch({
      url: "joblevel2/deleteJobLevel2ByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
