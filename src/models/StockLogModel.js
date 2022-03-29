import { BaseModel } from "./MainModel";

export default class StockLogModel extends BaseModel {
  async getStockLogLastCode(data) {
    return this.authFetch({
      url: "stocklog/getStockLogLastCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async insertStocklog(data) {
    return this.authFetch({
      url: "stocklog/insertStocklog",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getStockLogByType(data) {
    return this.authFetch({
      url: "stocklog/getStockLogByType",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getStockLogByIssueCode(data) {
    return this.authFetch({
      url: "stocklog/getStockLogByIssueCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
