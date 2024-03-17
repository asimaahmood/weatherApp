<template>
<div class="">
    <nav class="bg-gray-100 shadow-md p-2">
        <div class="flex flex-1 items-center justify-between">
            <div class="hidden sm:ml-6 sm:block">
                <div class="flex font-medium">
                    <div class="custom px-3">
                        <RouterLink to="/">
                            Home
                        </RouterLink>
                    </div>
                    <div class="custom px-3">
                        <RouterLink to="/about">About</RouterLink>
                    </div>
                    <div class="custom px-3">
                        <RouterLink to="/todos">Todo</RouterLink>
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
<RouterView />
</template>

<script>
import {
    RouterLink,
    RouterView
} from 'vue-router'
export default {
    data() {
        return {
            searchText: '',
            results: [{
                    id: 1,
                    name: 'Result 1'
                },
                {
                    id: 2,
                    name: 'Result 2'
                },
                {
                    id: 3,
                    name: 'Result 3'
                },
            ],
            showDropdown: false,
            filteredResults: [],
        };
    },
    methods: {
        filterResults() {
            this.filteredResults = this.results.filter(result =>
                result.name.toLowerCase().includes(this.searchText.toLowerCase())
            );
        },
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },
        selectResult(result) {
            this.searchText = result.name;
            this.showDropdown = false;
        },
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
