import WeatherApi from './WeatherApi.mjs';

const apiKey = '7f3b691ca2b1b1e70a8e3c3c0d4bd4d1';  
const weatherApi = new WeatherApi(apiKey);
 

export default async function displayWeather() {
  try {
 
    const latitude = -33.4489;
    const longitude = -70.6693;

    const weatherData = await weatherApi.getWeatherByCoords(latitude, longitude);
         // console.log('Weather Data:', weatherData);

    const temperature = weatherData.main.temp;  
    document.querySelector('#currentWheather').innerHTML= `, Temperature in Santiago, Chile: ${temperature}°C`;
       
  } catch (error) {
    //   console.error('Error retrieving weather data:', error);
  }
}
 
