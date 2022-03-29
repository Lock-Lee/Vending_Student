import { BaseModel } from './MainModel'

export default class UserGroup extends BaseModel {
    async generateUserGroupLastCode(data) {
        return this.authFetch({
            url: "user-group/generateUserGroupLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
    async getUserGroupLastCode(data) {
        return this.authFetch({
            url: "user-group/getUserGroupLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getUserGroupBy(data) {
        return this.authFetch({
            url: "user-group/getUserGroupBy",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getUserGroupByCode(data) {
        return this.authFetch({
            url: "user-group/getUserGroupByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async updateUserGroupBy(data) {
        return this.authFetch({
            url: "user-group/updateUserGroupBy",
            method: "POST",
            body: JSON.stringify(data),
        });

    }

    async insertUserGroup(data) {
        return this.authFetch({
            url: "user-group/insertUserGroup",
            method: "POST",
            body: JSON.stringify(data),
        });

    }

    async deleteUserGroupByCode(data) {

        return this.authFetch({
            url: "user-group/deleteUserGroupByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
}
