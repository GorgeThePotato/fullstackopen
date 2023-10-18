import { useState, useEffect } from 'react'
import countryService from './services/countries'
import SearchBar from './components/SearchBar';
import Countries from './components/Countries';
import SingleCountry from './components/SingleCountry';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');

  useEffect(() =>{
    countryService
      .getAllCountries()
      .then(allCountries =>{
        setCountries(allCountries);
      })
  },[]);

  const handleSearchChange = (event) =>{
    setSearchCountry(event.target.value)
  };
  
  const showDetails = (country) =>{
    setSearchCountry(country.name.common);
  }

  return (
    <div>
      <SearchBar value={searchCountry} onChange={handleSearchChange}/>
      <Countries countries={countries} searchCountry={searchCountry} showDetails={showDetails}/>
    </div>
  )
}

export default App
