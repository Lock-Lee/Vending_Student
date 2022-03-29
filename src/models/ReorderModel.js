import { BaseModel } from "./MainModel";

export default class ReorderModel extends BaseModel {
  async generateReorderLastCode(data) {
    return this.authFetch({
      url: "reorder/generateReorderLastCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getReorderLastCode(data) {
    return this.authFetch({
      url: "reorder/getReorderLastCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getReorderBy(data) {
    return this.authFetch({
      url: "reorder/getReorderBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getReorderByCode(data) {
    return this.authFetch({
      url: "reorder/getReorderByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateReorderBy(data) {
    return this.authFetch({
      url: "reorder/updateReorderBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async insertReorder(data) {
    return this.authFetch({
      url: "reorder/insertReorder",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteReorderByCode(data) {
    return this.authFetch({
      url: "reorder/deleteReorderByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
