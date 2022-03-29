import GLOBAL from '../GLOBAL'

export default class BaseModel {
    async authFetch(data) {

        const response = await fetch(GLOBAL.BASE_SERVER.URL + data.url, {
            method: data.method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...GLOBAL.ACCESS_TOKEN,
            },
            body: data.body,
        }).then((response) => response.json().then((responseJson) => {
            return responseJson
        })).catch((error) => {
            return { require: false, data: [], err: error }
        })

        if (response.unauthorized) {
            localStorage.clear()
            window.location.reload()
        }

        return response
    }
}