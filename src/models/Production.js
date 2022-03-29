import { BaseModel } from './MainModel'

export default class Production extends BaseModel {
    async generateProductionCode(data) {
        return this.authFetch({
            url: "production/generateProductionCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
    async getProductionLastCode(data) {
        return this.authFetch({
            url: "production/getProductionLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getProductionBy(data) {
        return this.authFetch({
            url: "production/getProductionBy",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getProductionByCode(data) {
        return this.authFetch({
            url: "production/getProductionByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async updateProductionBy(data) {
     
        return this.authFetch({
            url: "production/updateProductionBy",
            method: "POST",
            body: JSON.stringify(data),
        });
       
    }

    async insertProduction(data) {
    
        return this.authFetch({
            url: "production/insertProduction",
            method: "POST",
            body: JSON.stringify(data),
        });

    }

    async deleteProductionByCode(data) {
       
        return this.authFetch({
            url: "production/deleteProductionByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
}
