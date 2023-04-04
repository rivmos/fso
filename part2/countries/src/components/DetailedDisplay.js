import React, { useEffect, useState } from 'react'
import axios from 'axios'

const DetailedDisplay = ({ singleCountryInfo }) => {
    const languages = Object.values(singleCountryInfo.languages)
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${singleCountryInfo.capital[0].toLowerCase()}&appid=${process.env.REACT_APP_WEATHER_KEY}`)
            .then(res => setWeatherData(res.data))
    }, [])


    return (
        <div>
            <h2>{singleCountryInfo.name.common}</h2>
            <span>capital {singleCountryInfo.capital[0]}</span>
            <br />
            <span>area {singleCountryInfo.area}</span>
            <h3>languages:</h3>
            <ul>
                {languages.map(language => <li key={language}>{language}</li>)}
            </ul>
            <div>{singleCountryInfo.flag}</div>
            <h2>Weather in {singleCountryInfo.capital[0]}</h2>
            <p>temperature {(weatherData?.main?.temp - 273.15).toFixed(1)} Celcius</p>
            <p>wind {weatherData?.wind?.speed} m/s</p>
        </div>
    )
}


export default DetailedDisplay