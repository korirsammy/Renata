import axios, { AxiosResponse } from 'axios';
import { IProduct } from '../models/product';
import { IVendor } from '../models/vendors';
import { toast } from 'react-toastify';
import { history } from '../..';
import { IUser, IUserFormValues } from '../models/user';


axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => {
    return Promise.reject(error);
})

axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network error - make sure API is running!')
    }
    const {status, data, config} = error.response;
    if (status === 404) {
        history.push('/notfound')
    }
    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/notfound')
    }
    if (status === 500) {
        toast.error('Server error - check the terminal for more info!')
    }
    throw error.response;
})


const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody) 
};

const Products = {
    list: (): Promise<IProduct[]> => requests.get('/productDetails'),    
    details: (id: string) => requests.get(`/productDetails/${id}`),
    create: (product: IProduct) => requests.post('/productDetails', product),
    update: (product: IProduct) => requests.put(`/productDetails/${product.id}`, product),
    delete: (id: string) => requests.del(`/productDetails/${id}`)
}
// const ProductDetails = {
//     list: (): Promise<IProductDetail[]> => requests.get('/productDetails'),    
//     details: (id: string) => requests.get(`/productDetails/${id}`),
//     create: (productDetail: IProductDetail) => requests.post('/productDetails', productDetail),
//     update: (productDetail: IProductDetail) => requests.put(`/productDetails/${productDetail.id}`, productDetail),
//     delete: (id: string) => requests.del(`/productDetails/${id}`)
// }
const Vendors = {
    list: (): Promise<IVendor[]> => requests.get('/productDetails'),    
    details: (id: string) => requests.get(`/productDetails/${id}`),
    create: (vendor: IVendor) => requests.post('/productDetails', vendor),
    update: (vendor: IVendor) => requests.put(`/productDetails/${vendor.id}`, vendor),
    delete: (id: string) => requests.del(`/productDetails/${id}`)
}

const User = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/login`, user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/register`, user),
}


export default {
    Products,  
    Vendors,
    User
}