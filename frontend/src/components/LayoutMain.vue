<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-800">
        <Sidebar :is-open="isOpen" @toggle="toggleSidebar"/>
        <main
            id="main"
            class="transition-all duration-300" 
            :class="[isOpen ? 'ml-64' : 'ml-16']"
        >
            <div class="p-6">
                <slot></slot>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'

const isOpen = ref(true)

const toggleSidebar = () => {
    isOpen.value = !isOpen.value
}
</script>