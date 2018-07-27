import axios from 'axios'
import { url, host } from './config'
axios.defaults.baseURL = url

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }

    const error = new Error(response.statusText)
    throw error
}

export async function request(reqUrl: string, options: object = { method: 'GET' }) {
    const response = await axios(reqUrl, options).then(checkStatus)
    return response
}
