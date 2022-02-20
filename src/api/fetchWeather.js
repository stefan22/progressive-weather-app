import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
const URL = `http://api.openweathermap.org/data/2.5/weather`;

export const fetchWeather = async (city) => {
  const { data } = await axios.get(URL, {
    params: {
      q: city,
      units: "metric",
      APPID: apiKey,
    },
  });

  return data;
};
