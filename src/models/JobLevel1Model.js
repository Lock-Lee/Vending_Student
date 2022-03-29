import { BaseModel } from "./MainModel";

export default class JobLevel1Model extends BaseModel {
  async getJobLevel1By(data) {
    return this.authFetch({
      url: "joblevel1/getJobLevel1By",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateJobLevel1By(data) {
    return this.authFetch({
      url: "joblevel1/updateJobLevel1By",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  
  async insertJobLevel1(data) {
    return this.authFetch({
      url: "joblevel1/insertJobLevel1",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteJobLevel1ByCode(data) {
    return this.authFetch({
      url: "joblevel1/deleteJobLevel1ByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
