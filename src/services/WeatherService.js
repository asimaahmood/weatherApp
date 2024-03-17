import axios from 'axios';

const API_KEY = 'a7bb6ed35a5b4e18b0271208241703';

const WeatherService = {
    getWeather: async (location) => {
        try {
            const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`);
            return response.data;
        } catch (error) {
            throw new Error('Unable to get weather');
        }
    }
}

export default WeatherService;