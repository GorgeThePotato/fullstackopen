import { useState, useEffect } from 'react'
import SingleCountry from './SingleCountry';

const Countries = ({countries,searchCountry, showDetails}) =>{

    if(searchCountry === ""){
        return(
            <div></div>
        )
    }
    if(countries.filter(country => country.name.common.match(searchCountry)).length > 10){
        return(
            <p>Too many matches, specify another filter</p>
        )
    }

    if(countries.filter(country => country.name.common.match(searchCountry)).length === 1){
        return(
            <div>
            {countries
            .filter(country => country.name.common.toLowerCase().match(searchCountry.toLowerCase()))
            .map(country =>{
                return <SingleCountry key={country.cca2} country={country}/>
            })}
            </div>
        )
    }

    return(
        <div>
            <ul>
                {countries
                    .filter(country => country.name.common.toLowerCase().match(searchCountry.toLowerCase()))
                    .map(country =>{
                    return <li key={country.cca2}>{country.name.common} <button key={country.cca2} onClick={() =>showDetails(country)}>show</button></li>
            })}
            </ul>
        </div>
    )
}

export default Countries;