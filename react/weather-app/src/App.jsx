import { useState, useEffect } from "react";
import "./App.css";
import "./component/weather-app.jsx";
import WeatherApp from "./component/weather-app.jsx";
import OptionBox from "./component/option-box.jsx";

import { ClipLoader } from "react-spinners";

// 1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다.
// 2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태 정보가 들어간다.
// 3. 5개의 버튼이 있다.(현재 위치, 4개는 다른 도시)
// 4. 도시 버튼을 클릭할때마다 도시별 날씨가 나온다.
// 5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안, 로딩 스피너가 돈다.

function App() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("");
    const [loading, setloading] = useState(false);

    const cities = ["melbourne", "berlin", "tokyo", "busan"];

    const getCurrentLocation = () => {
        console.log("현재 위치");
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            getWeatherByCurrentLocation(lat, lon);
        });
    };

    // API를 호출해서 데이터를 가져오기
    const getWeatherByCurrentLocation = async (lat, lon) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=83d9de054c0a9f6845a3692815169707&units=metric&lang=kr`;
        setloading(true);
        let response = await fetch(url);
        let data = await response.json();
        setWeather(data);
        setloading(true);
    };

    const getWeatherByCity = async () => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=83d9de054c0a9f6845a3692815169707&units=metric&lang=kr`;
        setloading(true);
        let response = await fetch(url);
        let data = await response.json();
        console.log("Data", data);
        setWeather(data);
        setloading(false);
    };

    // 앱이 실행되자 마자.
    useEffect(() => {
        if (city == "") {
            getCurrentLocation();
        } else {
            getWeatherByCity();
        }
    }, [city]);

    return (
        <>
            {loading ? (
                <div className="content-box">
                    <ClipLoader
                        color="#f9ca11"
                        loading={loading}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : (
                <div className="content-box">
                    <WeatherApp weather={weather} />
                    <OptionBox cities={cities} setCity={setCity} />
                </div>
            )}
        </>
    );
}

export default App;
