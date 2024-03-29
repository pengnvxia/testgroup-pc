import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import Base from '@/services/base';
import { PROJECTSERVER } from '@/config/host';

export function list(): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/user/list`,
        method: 'get'
    };
    return Base(config);
}

export function getUserInfo(): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/user/userInfo`,
        method: 'get'
    }
    return Base(config);
}
