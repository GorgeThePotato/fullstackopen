import axios from "axios";

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const api_key = import.meta.env.VITE_SOME_KEY;

const getCapitalWeather = (capital) =>{
    const request = axios.get(`${baseUrl}?q=${capital}&units=metric&appid=${api_key}`)
    return request.then(response=>response.data)
};

export default{
    getCapitalWeather
}