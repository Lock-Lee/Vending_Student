import { BaseModel } from "./MainModel";

export default class UserGroupProductModel extends BaseModel {
  async getUserGroupProductByGroup(data) {
    return this.authFetch({
      url: "UserGroupProduct/getUserGroupProductByGroup",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async insertUserGroupProduct(data) {
    return this.authFetch({
      url: "UserGroupProduct/insertUserGroupProduct",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async deleteUserGroupProductByGroupCode(data) {
    return this.authFetch({
      url: "UserGroupProduct/deleteUserGroupProductCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async getUserGroupProductByMutiGroup(data) {
    return this.authFetch({
      url: "UserGroupProduct/getUserGroupProductByMutiGroup",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
