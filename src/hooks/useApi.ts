import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

export const BASE_URL = 'https://marvels-shop.ru'

type MethodsType = 'POST' | 'PUT' | 'GET' | 'DELETE'

const useApi = async (method: MethodsType, url: string, config?: AxiosRequestConfig<{}> | undefined, data?: any): Promise<AxiosResponse<any, any>> => {

    const requestUrl = `${BASE_URL}/api${url}`
    let response: AxiosResponse<any, any>

    switch (method) {
        case 'POST':
            response = await axios.post(requestUrl, data, config).then(
                response => { return response }
            )
            return response

        case 'PUT':
            response = await axios.put(requestUrl, data, config).then(
                response => { return response }
            )
            return response

        case 'GET':
            response = await axios.get(requestUrl, config).then(
                response => { return response }
            )
            return response

        case 'DELETE':
            response = await axios.delete(requestUrl, config).then(
                response => { return response }
            )
            return response

        default:
            return {config: {}, data: {}, headers: {}, status: -1, statusText: '', request: ''};
    }
}

export default useApi;