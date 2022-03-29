import { BaseModel } from "./MainModel";

export default class ToolsLifeRecordModel extends BaseModel {
  async generateToolsLifeRecordLastCode(data) {
    return this.authFetch({
      url: "tools-life-record/generateToolsLifeRecordLastCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getToolsLifeRecordLastCode(data) {
    return this.authFetch({
      url: "tools-life-record/getToolsLifeRecordLastCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getToolsLifeRecordBy(data) {
    return this.authFetch({
      url: "tools-life-record/getToolsLifeRecordBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getToolsLifeRecordByCode(data) {
    return this.authFetch({
      url: "tools-life-record/getToolsLifeRecordByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateToolsLifeRecordBy(data) {
    return this.authFetch({
      url: "tools-life-record/updateToolsLifeRecordBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async insertToolsLifeRecord(data) {
    return this.authFetch({
      url: "tools-life-record/insertToolsLifeRecord",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async deleteToolsLifeRecordByCode(data) {
    return this.authFetch({
      url: "tools-life-record/deleteToolsLifeRecordByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
