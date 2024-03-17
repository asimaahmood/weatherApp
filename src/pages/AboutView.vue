<template>
<div>
    <table>
        <thead>
            <tr>
                <th>
                    <input type="checkbox" v-model="selectAll" @change="updateSelectAll" :indeterminate="isIndeterminate" :class="{ indeterminate: isIndeterminate }" />
                </th>
                <th>Header Column 1</th>
                <th>Header Column 2</th>
                <!-- Add more header columns as needed -->
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in items" :key="index">
                <td>
                    <input type="checkbox" v-model="selectedItems" :value="item" @change="updateSelectAll" />
                </td>
                <td>{{ item.column1 }}</td>
                <td>{{ item.column2 }}</td>
                <!-- Add more columns for your data as needed -->
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
export default {
    data() {
        return {
            items: [{
                    column1: 'Item 1 Column 1',
                    column2: 'Item 1 Column 2'
                },
                {
                    column1: 'Item 2 Column 1',
                    column2: 'Item 2 Column 2'
                },
                // Add more items as needed
            ],
            selectedItems: [],
        };
    },
    computed: {
        selectAll: {
            get() {
                return this.selectedItems.length === this.items.length;
            },
            set(value) {
                if (value) {
                    this.selectedItems = this.items.slice();
                } else {
                    this.selectedItems = [];
                }
            },
        },
        isIndeterminate() {
            return this.selectedItems.length > 0 && this.selectedItems.length < this.items.length;
        },
    },
    methods: {

        updateSelectAll() {
            if (this.selectedItems.length === this.items.length) {
                this.selectAll = true;
            } else if (this.selectedItems.length === 0) {
                this.selectAll = false;
            }
        },
    },
};
</script>
