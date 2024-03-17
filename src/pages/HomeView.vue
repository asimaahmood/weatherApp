<!-- src/components/Weather.vue -->

<template>
<div>
    <h2>Current Weather</h2>
    <input type="text" v-model="location" placeholder="Enter location">
    <button @click="fetchWeather">Get Weather</button>
    <div v-if="weatherData">
        <p>Location: {{ weatherData.location.name }}, {{ weatherData.location.country }}</p>
        <p>Temperature: {{ weatherData.current.temp_c }}°C</p>
        <p>Local Time: {{ weatherData.current.last_updated }}</p>
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
