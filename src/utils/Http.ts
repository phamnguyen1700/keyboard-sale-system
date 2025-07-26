import { AxiosRequestConfig, AxiosResponse } from "axios";
import http from "./axiosInterceptor";

export const get = async <T = unknown>(
    url: string,
    option: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => {
    const res: AxiosResponse<T> = await http.get(url, option);
    return res;
};

export const post = async <T = unknown>(
    url: string,
    data: unknown = {},
    option: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => {
    const res: AxiosResponse<T> = await http.post(url, data, option);
    return res;
};

export const put = async <T = unknown>(
    url: string,
    data: unknown = {},
    option: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => {
    const res: AxiosResponse<T> = await http.put(url, data, option);
    return res;
};

export const remove = async <T = unknown>(
    url: string,
    option: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => {
    const res: AxiosResponse<T> = await http.delete(url, option);
    return res;
};

export const postForm = async <T = unknown>(
    url: string,
    data: FormData,
    option: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    const config = { ...option };
    if (!config.headers) config.headers = {};
    delete config.headers['Content-Type']; // QUAN TRỌNG
    const res: AxiosResponse<T> = await http.post(url, data, config);
    return res;
  };
  
