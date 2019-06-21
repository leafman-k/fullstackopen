import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import Filter from './components/Filter'


const App = () => {
    const [countries, setCountries] = useState([])
    const [countryFilter, setCountryFilter] = useState('')


    useEffect(() => {

        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])
    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setCountryFilter(event.target.value)
    }
    const changeFilter = (event) => {
        console.log(event.target.name)
        setCountryFilter(event.target.name)
    }

    const countriesToShow = countryFilter === '' ? [] : countries.filter(country =>
        country.name.toLowerCase().startsWith(countryFilter.toLowerCase()))
    return (
        <div>
            <Filter filter={countryFilter} handleChange={handleFilterChange}/>
            <CountryList countries={countriesToShow} handleChange={changeFilter}/>
        </div>

    )
}

export default App;
