import { useState } from "react";
import Card from "./Card";

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

  return (
    <Card>
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-24">
        <section className="weather-info__numeric flex flex-col gap-y-1">
          <p>
            {`${months[date.getMonth()]} ${date.getDate()}, ${
              date.getHours().toString().length === 1
                ? `0${date.getHours()}`
                : date.getHours()
            }:${
              date.getMinutes().toString().length === 1
                ? `0${date.getMinutes()}`
                : date.getMinutes()
            }`}
          </p>
          <p className="text-xl">{`${data.name}, ${data.sys.country}`}</p>
          <h1 className="text-4xl font-bold flex gap-x-4 items-center">
            <span>{Math.round(data.main.temp)}&deg;C</span>
            <img
              src={`${import.meta.env.VITE_WEATHER_ICON_URL}/${
                data.weather[0].icon
              }@2x.png`}
              alt={`${data.weather[0].description} icon`}
            />
          </h1>
          <p>
            <span>High: {data.main.temp_max}&deg;</span> &bull;{" "}
            <span>Low: {data.main.temp_min}&deg;</span>
          </p>
        </section>
        <section className="weather-info__description">
          <p className="font-bold mb-1">{data.weather[0].main}</p>
          <ul className="flex flex-col gap-y-1">
            <li>Feels like: {data.main.feels_like}&deg;</li>
            <li>Humidity: {data.main.humidity}%</li>
            <li>Wind: {data.wind.speed} m/s</li>
          </ul>
        </section>
      </div>
    </Card>
  );
};

export default WeatherCard;
