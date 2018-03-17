import React, { Component } from 'react';
import { TERMOMETER, WIND, HUMIDITY, THUNDERSTORM, RAIN, CLOUDY_RAINY, SNOWY, MIST, SUNNY, CLOUDY, THORNADO } from './Images';

class WeatherCard extends Component {
    decodeWeatherCode(code){
        if(code >= 200 && code < 300)
            return THUNDERSTORM;
        if(code >= 300 && code < 400)
            return CLOUDY_RAINY;
        if(code >= 500 && code < 600)
            return RAIN;
        if(code >= 600 && code < 700)
            return SNOWY;
        if(code >= 700 && code < 800)
            return MIST;
        if(code === 800)
            return SUNNY;
        if(code > 800 && code < 900)
            return CLOUDY;
        if(code > 900)
            return THORNADO;
    }

    tempToCelsius(tempInKelvin){
        return Math.round((tempInKelvin - 273.15) * 100) / 100;
    }

    render() {
        const weather = this.props.data;
        const weatherIcon = this.decodeWeatherCode(weather.weather[0].id);
        const minTemp = this.tempToCelsius(weather.main.temp_min);
        const maxTemp = this.tempToCelsius(weather.main.temp_max);

        return (
            <div className="col-sm-3 col-md-2">
                <img className="weather-icon align-self-center" src={weatherIcon} alt="sunny" />
                <h2>{weather.name}</h2>
                <div id="meta-data" className="row no-gutters">
                    <div className="col-12">
                        <p>
                            <img className="weather-icon" src={TERMOMETER} alt="tmep" />
                            {minTemp}C&deg; - {maxTemp}C&deg;
                        </p>
                    </div>
                    <div className="w-100"></div>
                    <div className="col-12">
                        <div className="text-center">
                            <img className="weather-icon icon-space" src={WIND} alt="wind" />
                            <span>{weather.wind.speed} km/h</span>
                            <img className="weather-icon icon-space" src={HUMIDITY} alt="humidity" />
                            <span>{weather.main.humidity}%</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherCard;
