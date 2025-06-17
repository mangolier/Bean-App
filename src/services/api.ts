import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("jwt");
            window.location.href = "/login";
        } else if (!error.response || error.response.status >= 500) {
            window.location.href = "/error";
        }
        return Promise.reject(error);
    }
);

export const get = <T = any>(url: string, config?: AxiosRequestConfig) =>
    api.get<T>(url, config);

export const post = <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
) => api.post<T>(url, data, config);

export const put = <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
) => api.put<T>(url, data, config);

export const del = <T = any>(url: string, config?: AxiosRequestConfig) =>
    api.delete<T>(url, config);

export default api;