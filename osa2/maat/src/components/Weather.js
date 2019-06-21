import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = ({capital})=>{
    const[newWeather, setNewWeather] = useState([])
    const apikey = ''
    useEffect(() => {

        axios
            .get(`http://api.apixu.com/v1/current.json?key=${apikey}&q=${capital}`)
            .then(response => {
                setNewWeather(response.data)
            })

    }, [])

    if(newWeather.length === 0){
        return <div></div>
    }
    else {
        return (
            <div>
                <h1>Weather in {capital}</h1>
                <p>
                    Temperature: {newWeather.current.temp_c} Celsius
                </p>
                <img src={newWeather.current.condition.icon} alt="Icon"/>
                <p>Wind: {newWeather.current.wind_kph} kph direction {newWeather.current.wind_dir}</p>
            </div>
        )
    }
}
export default Weather