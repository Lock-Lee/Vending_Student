import { BaseModel } from "./MainModel";

export default class JobOPToolsModel extends BaseModel {
  async getJobOPToolsLastCode(data) {
    return this.authFetch({
      url: "JobOpTools/getJobOPToolsLastCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getJobOPToolsBy(data) {
    return this.authFetch({
      url: "JobOpTools/getJobOPToolsBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getJobOPToolsByCode(data) {
    return this.authFetch({
      url: "JobOpTools/getJobOPToolsByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async saveJobOPToolsBy(data) {
    return this.authFetch({
      url: "JobOpTools/saveJobOPToolsBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async updateJobOPToolsBy(data) {
    return this.authFetch({
      url: "JobOpTools/updateJobOPToolsBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async insertJobOPTools(data) {
    return this.authFetch({
      url: "JobOpTools/insertJobOPTools",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async createRowJobOPTools(data) {
    return this.authFetch({
      url: "JobOpTools/createRowJobOPTools",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async deleteJobOPToolsByCode(data) {
    return this.authFetch({
      url: "JobOpTools/deleteJobOPToolsByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async deleteJobOPToolsByCodeNotIn(data) {
    return this.authFetch({
      url: "JobOpTools/deleteJobOPToolsByCodeNotIn",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
