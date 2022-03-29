import BaseModel from "./BaseModel";

export default class ReceiveToolModel extends BaseModel {
  async ReceiveTools(data) {
    return this.authFetch({
      url: "receivetool/ReceiveTools",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
