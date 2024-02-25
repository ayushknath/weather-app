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
  const [searchTerm, setSearchTerm] = useState("");

  async function getWeatherData() {
    if (searchTerm === "") {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }

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
        console.log(`Weather API error: ${err.message}`);
      });
  }

  async function convertToLatLong() {
    if (searchTerm === "") return;

    setIsDataAvailable(false);
    await axios
      .get(
        `${import.meta.env.VITE_GEOCODING_URL}?q=${searchTerm}&limit=1&appid=${
          import.meta.env.VITE_API_KEY
        }`
      )
      .then(({ data: [{ lat, lon }] }) => {
        setLatitude(lat);
        setLongitude(lon);
      })
      .catch((err) => {
        console.log(`Geocoding API error: ${err.message}`);
      });
  }

  useEffect(() => {
    getWeatherData();
  }, [latitude, longitude]);

  return (
    <div className="w-fit h-screen mx-auto flex flex-col gap-y-8 items-center justify-center">
      <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
        <input
          type="search"
          placeholder="Search weather for a city"
          name="weatherCity"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          value={searchTerm}
          className="w-full sm:w-4/5 ring-1 ring-slate-200 rounded-md px-4 py-2 focus:ring-0"
        />
        <button
          type="submit"
          className="w-full sm:w-1/5 bg-cyan-500 rounded-md px-4 py-2"
          onClick={convertToLatLong}
        >
          Search
        </button>
      </div>
      {!isDataAvailable ? <Spinner /> : <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App;
