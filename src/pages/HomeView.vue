<!-- src/components/Weather.vue -->

<template>
<div class="home-view-background text-white">
    <h2>Current Weather</h2>
    <input type="text" v-model="location" placeholder="Enter location">
    <button @click="fetchWeather">Get Weather</button>
    <div v-if="weatherData">
        <p>{{ weatherData }}</p>
        <p>*******</p>
        <p>Location: {{ weatherData.location.name }}, {{ weatherData.location.country }}</p>
        <p>Temperature: {{ weatherData.current.temp_c }}°C</p>
        <p>Feels Like: {{ weatherData.current.feelslike_c }}°C</p>
        <p>Local Time: {{ weatherData.current.last_updated }}</p>
        <p>condition: {{ weatherData.current.condition.text}}</p>
        <p>Wind Speed: {{ weatherData.current.wind_kph}}Kmph</p>
        <p>Degree: {{ weatherData.current.wind_degree}}</p>
        <p>Wind Direction: {{ weatherData.current.wind_dir}}</p>
        <p>Pressure: {{ weatherData.current.pressure_in}}mm</p>
        <p>Precipitation: {{ weatherData.current.precip_in}}mm </p>
        <p>Humidity: {{ weatherData.current.humidity}}%</p>
        <p>Cloud Cover: {{ weatherData.current.cloud}}%</p>
        <p>Visibility: {{ weatherData.current.vis_km}}Km</p>
        <p>UV Index: {{ weatherData.current.uv}}</p>
        <p>Wind Gust: {{ weatherData.current.gust_kph}}km/h</p>
        <img :src="weatherData.current.condition.icon"/>
    </div>
    <div v-else-if="loading">
        <p>Loading...</p>
    </div>
    <div v-else>
        <p>No data available</p>
    </div>
</div>

</template>

<script>
import {
    ref
} from 'vue';
import WeatherService from '../services/WeatherService';
// import HelloWorld from '../components/HelloWorld.vue';

export default {
    name: 'Weather',
    setup() {
        const location = ref('');
        const weatherData = ref(null);
        const loading = ref(false);

        const fetchWeather = async () => {
            loading.value = true;
            try {
                const data = await WeatherService.getWeather(location.value);
                weatherData.value = data;
            } catch (error) {
                console.error(error);
            } finally {
                loading.value = false;
            }
        };

        return {
            location,
            weatherData,
            loading,
            fetchWeather
        };
    }
};
</script>

<style scoped>
    .home-view-background{
        position: relative;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url(https://wallpapers.com/images/high/weather-scenarios-collage-dbk9c5n23l7e5fgb.webp);
        height: 100vh;
    }
</style>