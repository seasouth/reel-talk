import axios from 'axios';

const USERS_ENDPOINT = 'http://localhost:8080/api/users';
const BASE_URL = 'http://localhost:8080';
const OMDB_BASE_URL = 'http://www.omdbapi.com/?apikey=[yourkey]&'

export const axiosGet = (endpoint) => {
    let path = BASE_URL + endpoint;
    console.log(path);
    return axios.get(path);
}

export const axiosExternalGet = (url) => {
    return axios.get(url);
}

export const axiosPost = (endpoint, data) => {
    let path = BASE_URL + endpoint;
    console.log(endpoint);
    console.log(data);
    console.log(path);
    return axios.post(path, data);
}