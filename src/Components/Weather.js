import React, { useEffect, useState } from 'react'
import './Weather.css'
import axios from 'axios'

function Weather() {
    const [city, setCity] = useState('')
    const [search, setSearch] = useState('surat')
    const [unit, setUnit] = useState('metric')
    const [error, setError] = useState('')
    const [hide, setHide] = useState(false)


    useEffect(() => {
        const API_KEY = '64f60853740a1ee3ba20d0fb595c97d5'
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=${unit}`)
            .then((res) => {
                setHide(false)
                setCity(res.data);
                // console.log(res);
            })
            .catch((err) => {
                setHide(true)
                setError(err.response.data.message)
            })
    }, [search, unit])

    const capitalize = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1)
    }

    const dateTime = (date, timezone) => {
        let aa = (date * 1000) + (timezone * 1000) - (19800000);
        let d = new Date(aa).toLocaleString();
        return d;
    }

    let img1 = `http://openweathermap.org/img/wn/`
    let img2 = `@4x.png`

    const convertCountryCode = (country) => {
        let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
        return regionNames.of(country)
    }

    const unitHandler = () => {
        if (unit == 'metric') {
            setUnit('imperial')
        }
        if (unit == 'imperial') {
            setUnit('metric')
        }
    }

    return (
        <div>
            <div className="W_container">
                <div className="container-fluid">
                    <div className="weather__header">
                        <form className="weather__search">
                            <input type="text" placeholder="Search for a city..." className="weather__searchform" onChange={(e) => setSearch(e.target.value)} />
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </form>
                        {hide == true ? null :
                            <div className="weather__units">
                                <div class="toggle-button-cover">
                                    <div class="button-cover">
                                        <div class="button r" id="button-1">
                                            <input type="checkbox" class="checkbox" onClick={unitHandler} />
                                            <div class="knobs"></div>
                                            <div class="layer"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    {hide == true ? <h2 className='weather__body'>{capitalize(error)}</h2> :
                        !city ? '' :
                            <>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="weather__body">
                                            <h1 className="weather__city"><i className="fa-solid fa-location-dot fs-2"></i>&nbsp; {capitalize(search)}, {convertCountryCode(city.sys.country)}</h1>
                                            <div className="weather__datetime">{dateTime(city.dt, city.timezone)}</div>
                                            <div className="weather__forecast">{city.weather[0].main}</div>
                                            <div className="weather__icon">
                                                <img src={img1 + city.weather[0].icon + img2} alt="" />
                                            </div>
                                            {unit == 'metric' ? <p className="weather__temperature">{city.main.temp} °C </p> :
                                                <p className="weather__temperature">{city.main.temp} °F </p>}
                                            {unit == 'metric' ? <div className="weather__minmax">
                                                <p>Min: {city.main.temp_min} °C</p>
                                                <p>Max: {city.main.temp_max} °C</p>
                                            </div> :
                                                <div className="weather__minmax">
                                                    <p>Min: {city.main.temp_min} °F</p>
                                                    <p>Max: {city.main.temp_max} °F</p>
                                                </div>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="weather__info">
                                            <div className="weather__card">
                                                <i className="fa-solid fa-temperature-full"></i>
                                                <div>
                                                    <p>Real Feel</p>
                                                    {unit == 'metric' ? <p className="weather__realfeel">{city.main.feels_like} °C</p> :
                                                        <p className="weather__realfeel">{city.main.feels_like} °F</p>}
                                                </div>
                                            </div>
                                            <div className="weather__card">
                                                <i className="fa-solid fa-droplet"></i>
                                                <div>
                                                    <p>Humidity</p>
                                                    <p className="weather__humidity">{city.main.humidity} %</p>
                                                </div>
                                            </div>
                                            <div className="weather__card">
                                                <i className="fa-solid fa-wind"></i>
                                                <div>
                                                    <p>Wind</p>
                                                    <p className="weather__wind">{city.wind.speed} m/s</p>
                                                </div>
                                            </div>
                                            <div className="weather__card">
                                                <i className="fa-solid fa-gauge-high"></i>
                                                <div>
                                                    <p>Pressure</p>
                                                    <p className="weather__pressure">{city.main.pressure} hPa</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Weather