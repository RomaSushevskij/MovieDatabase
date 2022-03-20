import axios from 'axios';

const configOMB = {
    baseURL: 'http://www.omdbapi.com',
};
const key = 'fa23d3a3';
const axiosInstance = axios.create(configOMB);

const API = {
    searchFilmsByTitle: (title: string) => {
        return axiosInstance.get(`/?apikey=${key}&t=${title}`)
            .then(response => {
                return response.data
            })

    },
    searchFilmsByType: (title: string, type: string) => {
    }
};


export default API;
