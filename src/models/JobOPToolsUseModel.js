import { BaseModel } from './MainModel'


export default class JobOPToolsUserModel extends BaseModel {
    async getJobOPToolsUseLastCode(data) {
        return this.authFetch({
            url: 'job-op-tools-ues/getJobOPToolsUseLastCode',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async getJobOPToolsUseBy(data) {
        return this.authFetch({
            url: 'job-op-tools-ues/getJobOPToolsUseBy',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async getJobOPToolsUseByCode(data) {
        return this.authFetch({
            url: 'job-op-tools-ues/getJobOPToolsUseByCode',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async saveJobOPToolsUseBy(data) {
        return this.authFetch({
            url: 'job-op-tools-ues/saveJobOPToolsUseBy',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async updateJobOPToolsUseBy(data) {
        return this.authFetch({
            url: 'job-op-tools-ues/updateJobOPToolsUseBy',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async insertJobOPToolsUse(data) {
        return this.authFetch({
            url: 'job-op-tools-ues/insertJobOPToolsUse',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async createRowJobOPToolsUse(data) {
        return this.authFetch({
            url: 'job-op-tools-ues/createRowJobOPToolsUse',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async deleteJobOPToolsUseByCode(data) {
        return this.authFetch({
            url: 'job-op-tools-ues/deleteJobOPToolsUseByCode',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async deleteJobOPToolsUseByCodeNotIn(data) {
        return this.authFetch({
            url: 'job-op-tools-ues/deleteJobOPToolsUseByCodeNotIn',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

  

  
 

   

}