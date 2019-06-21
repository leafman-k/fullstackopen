import React from 'react'

import Weather from './Weather'

const Country = ({country})=>{


    const languages = country.languages.map((language)=> <li key={language.name}>{language.name} </li>)

    const image = {
        width: '90px',
        height: '65px'
    };
    return (
        <div>
            <h1>{country.name}</h1>

            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {languages}
            </ul>
            <p>
                <img src={country.flag} alt="Flag" style={ image } />
            </p>
            <Weather capital={country.capital} />
            </div>
    )
}

export default Country