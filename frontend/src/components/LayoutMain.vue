<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-800">
        <Sidebar ref="sidebarRef" />
        <main :class="[
            // Large screens - full sidebar margin
            'lg:ml-64',
            // Medium screens - icon only sidebar margin
            'md:ml-16',
            // Small screens - no sidebar margin
            'ml-0'
        ]">
            <Navbar @toggle-sidebar="toggleSidebar" :class="['lg:hidden','md:hidden']" />
            <div class="p-6">
                <slot></slot>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'

const sidebarRef = ref(null)

const toggleSidebar = () => {
    sidebarRef.value?.toggleSidebar()
}
</script>