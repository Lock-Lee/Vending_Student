import { BaseModel } from './MainModel'


export default class PermissionModel extends BaseModel {

    async getPermissionBy(data) {
        return this.authFetch({
            url: "permission/getPermissionBy",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
}
    