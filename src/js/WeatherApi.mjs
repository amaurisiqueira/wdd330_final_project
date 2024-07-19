export default class WeatherApi {
    constructor(apiKey) {
      this.apiKey = apiKey;
      this.apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    }
  
    async getWeatherByCoords(latitude, longitude) {
      const url = `${this.apiUrl}?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric`;
  
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Weather data could not be retrieved');
        }
        const weatherData = await response.json();
        return weatherData;
      } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
      }
    }
   
  }
  
 
  