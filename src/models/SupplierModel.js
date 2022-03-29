import { BaseModel } from "./MainModel";

export default class SupplierModel extends BaseModel {
  async generateSupplierLastCode(data) {
    return this.authFetch({
      url: "supplier/generateSupplierLastCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getSupplierLastCode(data) {
    return this.authFetch({
      url: "supplier/getSupplierLastCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getSupplierBy(data) {
    return this.authFetch({
      url: "supplier/getSupplierBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getSupplierByCode(data) {
    return this.authFetch({
      url: "supplier/getSupplierByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateSupplierBy(data) {
    return this.authFetch({
      url: "supplier/updateSupplierBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async insertSupplier(data) {
    return this.authFetch({
      url: "supplier/insertSupplier",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteSupplierByCode(data) {
    return this.authFetch({
      url: "supplier/deleteSupplierByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
