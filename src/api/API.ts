import axios from 'axios';

const configOMB = {
    baseURL: 'https://www.omdbapi.com',
};
const key = 'fa23d3a3';
export let source: ReturnType<typeof axios.CancelToken.source>;
const axiosInstance = axios.create(configOMB);
const API = {
    searchFilmsByTitle: (title: string, typeValue: string, pageNumber = 1) => {
        const type = `${typeValue === 'All' ? '' : `&type=${typeValue.toLowerCase()}`}`
        const query = `?apikey=${key}&s=${title}${type}&page=${pageNumber}`
        source = axios.CancelToken.source()
        return axiosInstance.get(query, {
            cancelToken: source.token
        })
    },
    getFilmsData: (imdbID: string, typeValue: string) => {
        const type = `${typeValue === 'All' ? '' : `&type=${typeValue.toLowerCase()}`}`
        source = axios.CancelToken.source()
        return axiosInstance.get(`/?apikey=${key}&i=${imdbID}${type}`, {
            cancelToken: source.token
        })
    }
};


export default API;
