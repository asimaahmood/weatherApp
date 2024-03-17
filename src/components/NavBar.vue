<template>
<div class="">
    <nav class="bg-gray-100 shadow-md p-2">
        <div class="flex flex-1 items-center justify-between">
            <div class="hidden sm:ml-6 sm:block">
                <div class="flex font-medium">
                    <div class="custom px-3">
                        <RouterLink to="/">Home</RouterLink>
                    </div>
                    <div class="custom px-3">
                        <RouterLink to="/todos">More</RouterLink>
                    </div>
                    <div class="custom px-3">
                        <RouterLink to="/about">About</RouterLink>
                    </div>
                </div>
            </div>
            <div class="pr-4">
                <i class="material-symbols-outlined pr-3">
                    notifications
                </i>
                <i class="material-symbols-outlined pr-3">
                    settings
                </i>
                <i class="material-symbols-outlined">
                    account_circle
                </i>
            </div>
        </div>
    </nav>
</div>
</template>

    
<script>
import { RouterLink } from 'vue-router';

export default {
    name: 'NavBar',
    components: {
        RouterLink
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
.custom:hover {
    color: #1565C0;
    transition: color 0.5s ease-in-out;
    font-weight: 500;
    padding-bottom: 0px;
}
</style>
