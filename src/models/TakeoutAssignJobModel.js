import BaseModel from "./BaseModel";

export default class Takeouttool extends BaseModel {
  async getJobBy(data) {
    return this.authFetch({
      url: "job/getJobBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getJobOpBy(data) {
    return this.authFetch({
      url: "job-op/getJobOpBy",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getJobOpByCode(data) {
    return this.authFetch({
      url: "job-op/getJobOpByCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getMachineByJobOpCode(data) {
    return this.authFetch({
      url: "takeouttool/getMachineByJobOpCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getProcressByJobOpCode(data) {
    return this.authFetch({
      url: "takeouttool/getProcressByJobOpCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getToolUseByJobOpToolCode(data) {
    return this.authFetch({
      url: "takeouttool/getToolUseByJobOpToolCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getStocklayoutByProductCode(data) {
    return this.authFetch({
      url: "takeouttool/getStocklayoutByProductCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateProductUnitByProductCode(data) {
    return this.authFetch({
      url: "takeouttool/updateProductUnitByProductCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getProductByProductCodeAndName(data) {
    return this.authFetch({
      url: "takeouttool/getProductByProductCodeAndName",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getJobByProductCode(data) {
    return this.authFetch({
      url: "takeouttool/getJobByProductCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getOpByProductCode(data) {
    return this.authFetch({
      url: "takeouttool/getOpByProductCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getMachineByOpcode(data) {
    return this.authFetch({
      url: "takeouttool/getMachineByOpcode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getProcressByProductCode(data) {
    return this.authFetch({
      url: "takeouttool/getProcressByProductCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getindexCompartfromFIFO(data) {
    return this.authFetch({
      url: "takeouttool/getindexCompartfromFIFO",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async updateproductbyissue(data) {
    return this.authFetch({
      url: "takeouttool/updateproductbyissue",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
