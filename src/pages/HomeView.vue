<!-- src/components/Weather.vue -->

<template>
<div class="home-view-background">
    <div class="flex justify-center pt-4 ">
        <div class="border rounded-lg container  border-stone-400 p-3 bg-slate-300 shadow-lg animate ">
            <div class="grid grid-cols-1">
                <h1 class="text-black text-center mb-5 text-2xl"><i class="fa-solid fa-smog"></i> Find Out Current Weather</h1>
                <input type="text" v-model="location" placeholder="Enter location" @keypress.enter="fetchWeather" class="w-100 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-200 focus:ring-1 focus:ring-blue-200 text-black shadow-md">
            </div>
            <div class="pl-3 pt-1" v-if="!weatherData">
                <p class="text-red-400" v-if="!location.trim() && locationWarningMessage">
                    {{ locationWarningMessage }}
                </p>
                <p class="text-red-400" v-else-if="locationError">
                    {{ locationErrorMessage }}
                </p>
            </div>
            <div class="grid grid-cols-1 p-2 border-b mb-3 border-dark" v-if="weatherData">
                <p><i class="fa-solid fa-house-chimney"></i> {{ weatherData.location.name }}, {{ weatherData.location.region }},{{ weatherData.location.country }}</p>
            </div>
            <div v-if="weatherData">
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <img :src="weatherData.current.condition.icon" class="weather-image" />
                        <h1 class="mb-0 weather-temp-h1 pl-3"> {{ weatherData.current.temp_c }}°C </h1>
                        <div class=" pl-8">
                            <div class="flex items-center">
                                <h5 class="mb-2">{{ weatherData.current.condition.text}}</h5>
                            </div>
                            <div class="flex items-center">
                                <h5>Precipitation</h5>
                                <h5 class="pl-3">{{ weatherData.current.precip_in}} <sub>mm</sub></h5>
                            </div>
                        </div>
                    </div>
                    <div class="border rounded-full shadow-lg border-blue-800 bg-violet-300 px-8 py-2 text-white mr-5 opacity-25">
                        <h5><i class="fa-solid fa-calendar-days pr-3"></i> {{ formattedDate }}</h5>
                        <h5><i class="fa-solid fa-clock pr-3"></i> {{ formattedTime }}</h5>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-5 gap-4 text-center" v-if="weatherData">
                <div class="p-4">
                    <div class="weather-card-body">
                        <i class="fas fa-temperature-low "></i>
                        <div class="pl-3">
                            <span>Feels Like </span>
                            <h5>{{ weatherData.current.feelslike_c }}°C</h5>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <div class="weather-card-body">
                        <i class="fas fa-wind"></i>
                        <div class="pl-3">
                            <span>Wind Speed</span>
                            <h5>{{ weatherData.current.wind_kph}} <sub>Kmph</sub></h5>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <div class="weather-card-body">
                        <i class="fas fa-location-arrow"></i>
                        <div class="pl-3">
                            <span>Wind Direction</span>
                            <h5> {{ weatherData.current.wind_dir}}</h5>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <div class="weather-card-body">
                        <i class="far fa-compass"></i>
                        <div class="pl-3">
                            <span>Wind Degree</span>
                            <h5>{{ weatherData.current.wind_degree}}°</h5>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <div class="weather-card-body">
                        <i class="fas fa-arrow-alt-circle-down"></i>
                        <div class="pl-3 text-center">
                            <div>
                                <span>Wind Pressure </span>
                                <h5>{{ weatherData.current.pressure_in}} <sub>mm</sub></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-5 gap-2 text-center" v-if="weatherData">
                <div class="p-4">
                    <div class="weather-card-body">
                        <i class="fas fa-tint"></i>
                        <div class="pl-3">
                            <span>Humidity </span>
                            <h5>{{ weatherData.current.humidity}}%</h5>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <div class="weather-card-body">
                        <i class="fas fa-cloud"></i>
                        <div class="pl-3">
                            <span>Cloud Cover</span>
                            <h5>{{ weatherData.current.cloud}}%</h5>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <div class="weather-card-body">
                        <i class="fas fa-smog"></i>
                        <div class="pl-3">
                            <span>Visibility</span>
                            <h5> {{ weatherData.current.vis_km}} <sub>km</sub></h5>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <div class="weather-card-body">
                        <i class="fas fa-tachometer-alt"></i>
                        <div class="pl-3">
                            <span>UV Index</span>
                            <h5>{{ weatherData.current.uv}}</h5>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <div class="weather-card-body">
                        <i class="fas fa-arrow-alt-circle-down"></i>
                        <div class="pl-3">
                            <span>Wind Gust</span>
                            <h5>{{ weatherData.current.gust_kph}} km/h</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    ref,
    computed,
    onMounted
} from 'vue';
import moment from 'moment';
import WeatherService from '../services/WeatherService';
import { gsap } from 'gsap';
export default {
    name: 'Weather',
    setup() {
        const location = ref('');
        const weatherData = ref('');
        const loading = ref(false);
        const locationWarningMessage = "Please select a location";

        const formattedDate = computed(() => {
            if (weatherData.value.current.last_updated) {
                return moment(weatherData.value.current.last_updated).format('DD-MM-YYYY');
            } else {
                return '';
            }
        });

       onMounted(() => {
            console.log ('animate')
           // Use GSAP to animate the background element
           gsap.from('.animate', { duration: 1, scale: 0, opacity: 0, ease: customEase });
        });
        const customEase = (x) => {
        // Custom ease function for smoother animation
            return 1 - Math.pow(1 - x, 1);
        };
        const formattedTime = computed(() => {
            if (weatherData.value.current.last_updated) {
                return moment(weatherData.value.current.last_updated).format('h:mm a');
            } else {
                return '';
            }
        });

        const fetchWeather = async () => {
            if (!location.value.trim()) {
                console.warn(locationWarningMessage);
                return;
            }
            loading.value = true;
            try {
                const data = await WeatherService.getWeather(location.value);
                if (data && data.current && data.current.temp_c) {
                    weatherData.value = data;
                } else {
                    console.error("Weather data is invalid or missing temperature information");
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
            } finally {
                loading.value = false;
            } 
        };

        return {
            location,
            weatherData,
            loading,
            fetchWeather,
            locationWarningMessage,
            formattedDate,
            formattedTime,
            

        };
    },
   
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

.weather-temp-h1 {
    font-size: 4rem;
}

.weather-image {
    width: auto;
    height: 143px;
}

.weather-card-body {
    background-color: rgba(0, 166, 255, 0.429);
    border: 2px solid rgb(0, 35, 110);
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.419);
    padding: 20px;
    margin: 0 5px;
    display: flex;
}

.weather-card-body i {
    font-size: 3rem;
    color: rgba(0, 68, 255, 0.648);
    text-shadow: 1px 1px rgba(255, 255, 255, 0.167);
}

h5 {
    font-size: 1.2rem;
}
</style>
