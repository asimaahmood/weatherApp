<template>
<div class="">
    <nav-bar></nav-bar>
    <router-view></router-view>
</div>

</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
export default {
    components: {
        NavBar
    },
    data() {
        return {
        };
    },
    methods: {
    },
};
</script>

<style scoped>
</style>
