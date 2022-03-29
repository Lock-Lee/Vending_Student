import { BaseModel } from "./MainModel";

export default class JobLevel3Model extends BaseModel {
  async getJobLevel3By(data) {
    return this.authFetch({
      url: "joblevel3/getJobLevel3By",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateJobLevel3By(data) {
    return this.authFetch({
      url: "joblevel3/updateJobLevel3By",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async insertJobLevel3(data) {
    return this.authFetch({
      url: "joblevel3/insertJobLevel3",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteJobLevel3ByCode(data) {
    return this.authFetch({
      url: "joblevel3/deleteJobLevel3ByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
