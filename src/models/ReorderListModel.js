import { BaseModel } from "./MainModel";

export default class ReorderListModel extends BaseModel {

  async getReorderListByReordersCode(data) {
    return this.authFetch({
      url: "reorderlist/getReorderListByReordersCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateReorderBy(data) {
    return this.authFetch({
      url: "reorderlist/updateReorderBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async insertReorder(data) {
    return this.authFetch({
      url: "reorderlist/insertReorder",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteReorderByCode(data) {
    return this.authFetch({
      url: "reorderlist/deleteReorderByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
