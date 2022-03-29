import { BaseModel } from "./MainModel";

export default class JobModel extends BaseModel {
  async getJobLastCode(data) {
    return this.authFetch({
      url: "job/getJobLastCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getJobBy(data) {
    return this.authFetch({
      url: "job/getJobBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getJobByCode(data) {
    return this.authFetch({
      url: "job/getJobByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async saveJobBy(data) {
    return this.authFetch({
      url: "job/saveJobBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async updateJobBy(data) {
    return this.authFetch({
      url: "job/updateJobBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async insertJob(data) {
    return this.authFetch({
      url: "job/insertJob",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async createRowJob(data) {
    return this.authFetch({
      url: "job/createRowJob",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async deleteJobByCode(data) {
    return this.authFetch({
      url: "job/deleteJobByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async deleteJobByCodeNotIn(data) {
    return this.authFetch({
      url: "job/deleteJobByCodeNotIn",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
