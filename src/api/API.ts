import axios from 'axios';

const configOMB = {
    baseURL: 'http://www.omdbapi.com',
};
const key = 'fa23d3a3';
const axiosInstance = axios.create(configOMB);
//['All', 'Movie', 'Series', 'Episode']
const API = {
    searchFilmsByTitle: (title: string, typeValue: string) => {
        const type = `${typeValue === 'All' ? '' : `&type=${typeValue.toLowerCase()}`}`
        return axiosInstance.get(`/?apikey=${key}&s=${title}${type}`)
            .then(response => {
                return response.data
            })
    },
    getFilmsData: (imdbID: string, typeValue: string) => {
        const type = `${typeValue === 'All' ? '' : `&type=${typeValue.toLowerCase()}`}`
        return axiosInstance.get(`/?apikey=${key}&i=${imdbID}${type}`)
            .then(response => {
                debugger
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
    }
};


export default API;
