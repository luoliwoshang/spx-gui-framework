import axios from 'axios';

/**
 * @description 基础的ajax请求方法
 *
 * @param method 请求方法，"POST" / "GET"
 * @param url   请求地址
 * @param dataOrParams  请求参数/请求体
 * @param headers   请求头
 * @returns {Promise<any>}
 *
 * @author yxy
 * @createDate 2024.1.10
 */
export async function request(method, url, dataOrParams = null,headers={} ) {
    const base_url = "http://localhost:xxxx" + url;
    try {
        const defaultHeaders = {
            "Content-Type": "application/json",
        };

        const mergedHeaders = {
            ...defaultHeaders,
            ...headers,
        };

        const response = await axios({
            method,
            url: base_url,
            data: method.toLowerCase() === "get" ? null : dataOrParams,
            params: method.toLowerCase() === "get" ? dataOrParams : null,
            headers: mergedHeaders,
        });
        console.log(`[request] ${base_url} |接口请求成功，response:`);
        console.log(response)
        return response.data;
    } catch (error) {
        console.log(`[request] ${base_url} |接口请求失败, 请求体:dataOrParams: ${JSON.stringify(dataOrParams)}`);
        console.log(error);
        throw error;
    }
}
