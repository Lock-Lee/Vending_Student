import { BaseModel } from "./MainModel";

export default class IncidentModel extends BaseModel {
  async generateIncidentLastCode(data) {
    return this.authFetch({
      url: "incident/generateIncidentLastCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getIncidentLastCode(data) {
    return this.authFetch({
      url: "incident/getIncidentLastCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getIncidentBy(data) {
    return this.authFetch({
      url: "incident/getIncidentBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getIncidentByCode(data) {
    return this.authFetch({
      url: "incident/getIncidentByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateIncidentBy(data) {
    return this.authFetch({
      url: "incident/updateIncidentBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async insertIncident(data) {
    return this.authFetch({
      url: "incident/insertIncident",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteIncidentByCode(data) {
    return this.authFetch({
      url: "incident/deleteIncidentByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
