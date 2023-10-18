import weatherService from '../services/weather'
import { useEffect, useState } from 'react'

const SingleCountry = ({country}) =>{

    const [weather, setWeather] = useState({})
    const [isWeatherReady, setWeatherReady] = useState(false);

    useEffect(() =>{
        weatherService
        .getCapitalWeather(country.capital)
        .then(capitalWeather =>{
            setWeather(capitalWeather)
            setWeatherReady(true)
          })
      },[]);

      if(isWeatherReady){
        return(
            <div>
            <h1 key={country.cca2}>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <p>languages</p>
            <ul>
                {Object.keys(country.languages).map(key=>{
                    return <li key={key}>{country.languages[key]}</li>
                })}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}/>
            <h1>Weather in {country.capital}</h1>
            <p>temperature {weather.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            <p>wind {weather.wind.speed} m/s</p>
            </div>
        )
      }
    return(
        <div>
            <h1 key={country.cca2}>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <p>languages</p>
            <ul>
                {Object.keys(country.languages).map(key=>{
                    return <li key={key}>{country.languages[key]}</li>
                })}
            </ul>
            </div>
    )
}

export default SingleCountry;