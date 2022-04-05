import axios from 'axios';

const proxy = {
    without: 'https://www.omdbapi.com',
    anywhere: 'https://cors-anywhere.herokuapp.com/https://www.omdbapi.com',
    thingproxy: 'https://thingproxy.freeboard.io/fetch/https://www.omdbapi.com',

}
const configOMB = {
    baseURL: proxy.anywhere,
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
