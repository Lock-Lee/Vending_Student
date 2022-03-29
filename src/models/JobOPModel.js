import { BaseModel } from './MainModel'


export default class JobOPModel extends BaseModel {
    async getJobOPLastCode(data) {
        return this.authFetch({
            url: 'job-op/getJobOPLastCode',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async getJobOPBy(data) {
        return this.authFetch({
            url: 'job-op/getJobOPBy',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async getJobOPByCode(data) {
        return this.authFetch({
            url: 'job-op/getJobOPByCode',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async saveJobOPBy(data) {
        return this.authFetch({
            url: 'job-op/saveJobOPBy',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async updateJobOPBy(data) {
        return this.authFetch({
            url: 'job-op/updateJobOPBy',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async insertJobOP(data) {
        return this.authFetch({
            url: 'job-op/insertJobOP',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async createRowJobOP(data) {
        return this.authFetch({
            url: 'job-op/createRowJobOP',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async deleteJobOPByCode(data) {
        return this.authFetch({
            url: 'job-op/deleteJobOPByCode',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async deleteJobOPByCodeNotIn(data) {
        return this.authFetch({
            url: 'job-op/deleteJobOPByCodeNotIn',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

  

  
 

   

}