import { BaseModel } from "./MainModel";

export default class IncidentTypeModel extends BaseModel {
  async generateIncidentTypeLastCode(data) {
    return this.authFetch({
      url: "Incident-type/generateIncidentTypeLastCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getIncidentTypeLastCode(data) {
    return this.authFetch({
      url: "Incident-type/getIncidentTypeLastCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getIncidentTypeBy(data) {
    return this.authFetch({
      url: "Incident-type/getIncidentTypeBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getIncidentTypeByCode(data) {
    return this.authFetch({
      url: "Incident-type/getIncidentTypeByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateIncidentTypeBy(data) {
    return this.authFetch({
      url: "Incident-type/updateIncidentTypeBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async insertIncidentType(data) {
    return this.authFetch({
      url: "Incident-type/insertIncidentType",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteIncidentTypeByCode(data) {
    return this.authFetch({
      url: "Incident-type/deleteIncidentTypeByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
