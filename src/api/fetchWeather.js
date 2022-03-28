import { apiKey } from "./apiKey";
const apiKey = process.env.REACT_APP_API_KEY;
const URL = `https://api.openweathermap.org/data/2.5/weather?`;

var requestOptions = {
  method: "GET",
};

const fetchWeather = async city => {
  const mode = "json";
  const units = "metric";
  const lang = "en";

  const data = await fetch(`
      ${URL}q=${city}&units=${units}&appid=${apiKey}&mode=${mode}&lang=${lang}, ${requestOptions}
    `);

  return data;
};

export { fetchWeather };
