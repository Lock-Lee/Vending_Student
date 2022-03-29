import { BaseModel } from './MainModel'

export default class SendSetting extends BaseModel {
    async generateSendSettingLastCode(data) {
        return this.authFetch({
            url: "send-setting/getSendSettingLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
    async getSendSettingLastCode(data) {
        return this.authFetch({
            url: "send-setting/getSendSettingLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getSendSettingBy(data) {
        return this.authFetch({
            url: "send-setting/getSendSettingBy",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getSendSettingByCode(data) {
        return this.authFetch({
            url: "send-setting/getSendSettingByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async updateSendSettingBy(data) {
      
        return this.authFetch({
            url: "send-setting/updateSendSettingBy",
            method: "POST",
            body: JSON.stringify(data),
        });
       
    }

    async insertSendSetting(data) {
       
        return this.authFetch({
            url: "send-setting/insertSendSetting",
            method: "POST",
            body: JSON.stringify(data),
        });

    }

    async deleteSendSettingByCode(data) {
      
        return this.authFetch({
            url: "send-setting/deleteSendSettingByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
}
