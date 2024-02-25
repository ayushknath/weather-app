import { useState } from "react";

const WeatherCard = ({ data }) => {
  const [date, setDate] = useState(new Date());
  const [months, setMonths] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);

  // To be deleted
  console.log(data);

  return (
    <div className="weather-card">
      <div className="weather-info__main">
        <div className="weather-info__numeric">
          <p>
            {`${
              months[date.getMonth()]
            } ${date.getDate()}, ${date.getHours()}:${date.getMinutes()}`}
          </p>
          <p className="text-xl">
            {data.name}, {data.sys.country}
          </p>
          <p className="text-4xl font-bold">
            <span>{data.main.temp}&deg;C</span>{" "}
            <img
              src={`${import.meta.env.VITE_WEATHER_ICON_URL}/${
                data.weather[0].icon
              }@2x.png`}
              alt={`${data.weather[0].description} icon`}
            />
          </p>
          <p>
            <span>High: {data.main.temp_max}&deg;</span>&nbsp;&bull;&nbsp;
            <span>Low: {data.main.temp_min}&deg;</span>
          </p>
        </div>
        <div className="weather-info__description">
          <p>
            <b>{data.weather[0].main}</b>
          </p>
          <ul>
            <li>Humidity: {data.main.humidity} %</li>
            <li>Wind: {data.wind.speed} m/s</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
