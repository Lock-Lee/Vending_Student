import { BaseModel } from "./MainModel";

export default class SettingCostCenterModel extends BaseModel {

  async getsettingcostcenter(data) {

    return this.authFetch({
      url: "settingcostcenter/getsettingcostcenter",
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updatesettingcostcenter(data) {

    return this.authFetch({
      url: "settingcostcenter/updatesettingcostcenter",
      method: "POST",
      body: JSON.stringify(data),
    });
  }


}
