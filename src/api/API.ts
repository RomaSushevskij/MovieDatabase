import axios from 'axios';

const configOMB = {
    baseURL: 'http://www.omdbapi.com',
};
const key = 'fa23d3a3';
const axiosInstance = axios.create(configOMB);
const API = {
    searchFilmsByTitle: (title: string, typeValue: string) => {
        const type = `${typeValue === 'All' ? '' : `&type=${typeValue.toLowerCase()}`}`
        return axiosInstance.get(`/?apikey=${key}&s=${title}${type}`)
            .then(response => {
                debugger
                return response.data
            })
            .catch(error=> {
                console.log(error)
            })
    },
    getFilmsData: (imdbID: string, typeValue: string) => {
        const type = `${typeValue === 'All' ? '' : `&type=${typeValue.toLowerCase()}`}`
        return axiosInstance.get(`/?apikey=${key}&i=${imdbID}${type}`)
            .then(response => {
                const {Title,
                    Year,
                    Runtime,
                    Genre,
                    Director,
                    Actors,
                    Plot,
                    Language,
                    Country,
                    Poster,
                    Metascore,
                    imdbRating,
                    Response,
                    imdbID,} = response.data
                return {Title,
                    Year,
                    Runtime,
                    Genre,
                    Director,
                    Actors,
                    Plot,
                    Language,
                    Country,
                    Poster,
                    Metascore,
                    imdbRating,
                    Response,
                    imdbID,}
            })
            .catch(error => console.log(error))
    }
};


export default API;
