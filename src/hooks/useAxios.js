import axios from 'axios';

//const BASE_URL = 'https://reel-takes-9c3c97acd488.herokuapp.com/';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/';
const TMDB_API_KEY = 'f13366d7e39e24b8870e5dc2937769c9';
const baseUrl = process.env.REACT_APP_BASE_URL;

export const axiosGet = (endpoint) => {
    let path = baseUrl + endpoint;
    console.log(path);
    console.log("Current mode:", process.env.NODE_ENV);
    return axios.get(path);
}

export const axiosExternalGet = (url) => {
    return axios.get(url);
}

export const axiosTMDBGet = (endpoint, params) => {
    if (params) {
        return axios.get(`${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}${params}`);
    } else {
        return axios.get(`${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}`);
    }
}

export const axiosPost = (endpoint, data) => {
    let path = baseUrl + endpoint;
    console.log(endpoint);
    console.log(data);
    console.log(path);
    return axios.post(path, data);
}