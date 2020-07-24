import axios, { AxiosRequestConfig } from 'axios';

export const header: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
    }
};

export const http = axios.create({
    baseURL: 'https://localhost:44351/api/',
    responseType: 'json',
});

http.interceptors.request.use(config => {
    if (localStorage.token) {
        config.headers.Authorization = `Bearer ${localStorage.token}`
    }

    return config;
});

// http.interceptors.response.use(res => {
//     return res;
// }, err => {
//     if (err.response.status == 401)
//         localStorage.clear();
//     window.location.href = '/';

//     return Promise.reject(err);
// });