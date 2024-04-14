<!-- src/components/Weather.vue -->

<template>
<div class="home-view-background">
   
   
    <div v-if="weatherData">
        <p>{{ weatherData }}</p>
        <p>Location: {{ weatherData.location.name }}, {{ weatherData.location.region }},{{ weatherData.location.country }}</p>
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
        <img :src="weatherData.current.condition.icon" />
    </div>
    <div v-else-if="loading">
        <p>Loading...</p>
    </div>
    <div v-else>
        <p>No data available</p>
    </div>
    <div class="flex justify-center">
        <div class="border rounded-lg container backdrop-blur-lg border-stone-400 p-3 bg-slate-300 shadow-lg">
            <div class="grid grid-cols-1">
                <h1 class="text-black text-center mb-5 text-2xl"><i class="fa-solid fa-smog"></i> Find Out Current Weather</h1>
                <input type="text" v-model="location" placeholder="Enter location" @keypress.enter="fetchWeather" class="w-100 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-200 focus:ring-1 focus:ring-blue-200 text-black shadow-md bg-red">
                <!-- <button type="button" @click="fetchWeather" class="absolute inset-y-0 left-11% px-4 py-2 bg-blue-500"><i class="fa-solid fa-magnifying-glass"></i></button> -->
            </div>
            <!-- <div class="grid grid-cols-1 p-2 border-b mb-3 border-dark">
                <h4><i class="fa-solid fa-house-chimney"></i> {{ weatherData.location.name }}, {{ weatherData.location.region }},{{ weatherData.location.country }}</h4>
                <div class="flex">
                </div>
            </div> -->
            <!-- <div class="grid grid-cols-2 gap-3">
                <div class=" text-black p-4">Column 1</div>
                <div class="text-black p-4">Column 2</div>
                <div class="text-black p-4">Column 3</div>
                <div class="text-black p-4">Column 4</div>
            </div> -->
        </div>
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
.home-view-background {
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    background-image: url('/images/weather-image.jpg');
}
</style>
