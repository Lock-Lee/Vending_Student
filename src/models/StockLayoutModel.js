import { BaseModel } from "./MainModel";

export default class StockLayoutModel extends BaseModel {
  async generateClassByStockLayoutCode(data) {
    return this.authFetch({
      url: "stock_layout/generateClassByStockLayoutCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getStockLayout(data) {
    return this.authFetch({
      url: "stock_layout/getStockLayout",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getProductBy(data) {
    return this.authFetch({
      url: "stock_layout/getProductBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getStockLayoutByGroup(data) {
    return this.authFetch({
      url: "stock_layout/getStockLayoutByGroup",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getSuppliersBy(data) {
    return this.authFetch({
      url: "stock_layout/getSuppliersBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getSuppliersByProductCode(data) {
    return this.authFetch({
      url: "stock_layout/getSuppliersByProductCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateStockLayout(data) {
    return this.authFetch({
      url: "stock_layout/updateStockLayout",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async insertStockLayoutCode(data) {
    return this.authFetch({
      url: "stock_layout/insertStockLayoutCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteStockLayoutByStockYCode(data) {
    return this.authFetch({
      url: "stock_layout/deleteStockLayoutByStockYCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getCountReserve(data) {
    return this.authFetch({
      url: "stock_layout/getCountReserve",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getResevedSlotbyCode(data) {
    return this.authFetch({
      url: "stock_layout/getResevedSlotbyCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getMaxSlotbyCode(data) {
    return this.authFetch({
      url: "stock_layout/getMaxSlotbyCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getSlotRefillbyCode(data) {
    return this.authFetch({
      url: "stock_layout/getSlotRefillbyCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getMaxSlotisCode(data) {
    return this.authFetch({
      url: "stock_layout/getMaxSlotisCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getRemainSlotbyCode(data) {
    return this.authFetch({
      url: "stock_layout/getRemainSlotbyCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getCountReserveBycode(data) {
    return this.authFetch({
      url: "stock_layout/getCountReserveBycode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getSlotisNull(data) {
    return this.authFetch({
      url: "stock_layout/getSlotisNull",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getResevedSlotisNull(data) {
    return this.authFetch({
      url: "stock_layout/getResevedSlotisNull",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
