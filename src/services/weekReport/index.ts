import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import Base from '@/services/base';
import { PROJECTSERVER } from '@/config/host';

export function addHeader(uid: string): void {
    axios.defaults.headers.common['uid'] = uid;
}

export function add(weekReportForm: any): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/weekReport/add`,
        method: 'post',
        data: weekReportForm
    };
    return Base(config);
}

export function search(searchRequest: any): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/weekReport/list`,
        method: 'post',
        data: searchRequest
    };
    return Base(config);
}

export function deleteReport(id: number): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/weekReport/delete/${id}`,
        method: 'delete'
    };
    return Base(config);
}

export function reportDetail(id: string): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/weekReport/detail/${id}`,
        method: 'get'
    };
    return Base(config);
}

export function editReport(id: string,weekReportForm: any): AxiosPromise {
    const config: AxiosRequestConfig = {
        url: `${PROJECTSERVER}/weekReport/edit/${id}`,
        method: 'post',
        data: weekReportForm
    };
    return Base(config);
}


