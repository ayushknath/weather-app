import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./components/Spinner";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [weatherData, setWeatherData] = useState([]);
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  useEffect(() => {
    async function getWeatherData() {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });

      await axios
        .get(
          `${
            import.meta.env.VITE_API_URL
          }?lat=${latitude}&lon=${longitude}&appid=${
            import.meta.env.VITE_API_KEY
          }&units=metric`
        )
        .then((res) => {
          setWeatherData(res.data);
          setIsDataAvailable(true);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    getWeatherData();
  }, [latitude, longitude]);

  return (
    <div className="container mx-auto">
      {!isDataAvailable ? <Spinner /> : <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App;
