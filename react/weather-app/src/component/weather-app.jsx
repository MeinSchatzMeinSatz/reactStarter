import React from "react";

const WeatherApp = ({ weather }) => {
    console.log("weather", weather);
    return (
        <>
            <div className="weather-app_box">
                <h1 className="city">
                    {weather && weather.name.toUpperCase()}
                </h1>
                <div className="temperature">
                    <p>
                        {weather && weather.main.temp}°C /{" "}
                        {(weather && (weather.main.temp * 9) / 5) + 32}
                        °F
                    </p>
                </div>
                <p className="weather">
                    {weather && weather.weather[0].description}
                </p>
            </div>
        </>
    );
};

export default WeatherApp;
