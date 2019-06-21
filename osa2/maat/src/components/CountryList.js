import React from 'react';
import Country from './Country'

const CountryList = ({countries, handleChange})=>{

    if(countries.length === 1){
        return (
            <Country country={countries[0]}/>
        )
    }
    else if(countries.length > 1 && countries.length < 10){
        return (
            <div>
                {countries.map((country)=> <p key={country.name}>{country.name} <button onClick={handleChange} name={country.name}>Show</button> </p>)}
            </div>
        )
    }else if(countries.length > 10){
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }else {
        return (
            <div>

            </div>
        )
    }
}

export default CountryList