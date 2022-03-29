import { BaseModel } from "./MainModel";

export default class ReportModel extends BaseModel {
  async getReceiveReport(data) {
    return this.authFetch({
      url: "report/getReceiveReport",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getIssueReport(data) {
    return this.authFetch({
      url: "report/getIssueReport",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getBalanceReport(data) {
    return this.authFetch({
      url: "report/getBalanceReport",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getIncidentReport(data) {
    return this.authFetch({
      url: "report/getIncidentReport",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getTransactionReport(data) {
    return this.authFetch({
      url: "report/getTransactionReport",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getLowStockReport(data) {
    return this.authFetch({
      url: "report/getLowStockReport",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getSettingReport(data) {
    return this.authFetch({
      url: "report/getSettingReport",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateSettingReport(data) {
    return this.authFetch({
      url: "report/updateSettingReport",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async sendReceiveReport(data) {
    return this.authFetch({
      url: "email/sendReceiveReport",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async sendIssueReport(data) {
    return this.authFetch({
      url: "email/sendIssueReport",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async sendBalanceReport(data) {
    return this.authFetch({
      url: "email/sendBalanceReport",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async sendIncidentReport(data) {
    return this.authFetch({
      url: "email/sendIncidentReport",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async sendTransactionReport(data) {
    return this.authFetch({
      url: "email/sendTransactionReport",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async sendIssueEmail(data) {
    return this.authFetch({
      url: "email/sendIssueEmail",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async sendLowStockReport(data) {
    return this.authFetch({
      url: "email/sendLowStockReport",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
