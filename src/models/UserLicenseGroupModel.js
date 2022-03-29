import { BaseModel } from "./MainModel";

export default class UserLicenseGroupModel extends BaseModel {
  async getUserLicenseGroupbyCode(data) {
    return this.authFetch({
      url: "user-license-group/getUserLicenseGroupbyCode",
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
