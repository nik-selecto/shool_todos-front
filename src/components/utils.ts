import { LOCALHOST } from './constants';
import { CommonData } from './types';
import axios from 'axios';

export async function makeRequest(data: {
    method: 'post' | 'get',
    endpoint: `/${string}`,
    body?: Record<string, any>,
    headers?: Record<string, string>,
    query?: Record<string, any>,
}, options: Pick<CommonData, 'setLastReq' | 'setLastRes'>) {
    const {
        setLastReq,
        setLastRes,
    } = options;
    const {
        method,
        endpoint,
        headers,
        query,
        body,
    } = data;
    const url = `${LOCALHOST}${endpoint}`;

    setLastReq({ method, headers, url, query, body });

    try {
        const { data, headers, status } = await axios({
            method,
            url,
            data: body,
            validateStatus(status) { return true; },
        });

        setLastRes({
            status,
            headers,
            body: data,
        });

        return {
            data, headers, status,
        };
    } catch (error: any) {
        setLastRes({
            error: error.toString()
        });

        return {};
    };
}
