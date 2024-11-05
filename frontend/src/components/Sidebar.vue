<template>
    <div>
        <!-- Overlay pour mobile -->
        <div v-if="isOpen && isMobile" class="fixed inset-0 bg-black bg-opacity-50 z-20" @click="closeSidebar"></div>
        <!-- Sidebar -->
        <aside class="fixed top-0 bottom-0 bg-white dark:bg-gray-900 shadow-lg z-30 flex flex-col justify-between" :class="[
            // Large screens - full width sidebar
            'lg:left-0 lg:w-64',
            // Medium screens - icons only sidebar
            'md:left-0 md:w-16',
            // Small screens - hidden sidebar
            isOpen ? 'left-0' : '-left-64',
            isMobile ? 'w-64' : 'w-64'
        ]">
            <!-- Logo section -->
            <div class="flex items-center justify-center h-14 border-b border-gray-200 dark:border-gray-700">
                <img src="@/assets/images/appicon.png" alt="Logo" class="h-8 w-8" />
                <span class="ml-2 text-lg font-semibold text-gray-800 dark:text-white lg:block md:hidden sm:block">
                    Pomod'App
                </span>
            </div>
            <!-- Navigation -->
            <SidebarNav :icon-only="!isOpen && !isMobile && isMedium" />
            <!-- ProPlan section -->
            <SidebarProPlan :icon-only="!isOpen && !isMobile && isMedium" />
        </aside>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { BREAKPOINTS } from "@/constants/breakpoints"
import SidebarNav from './SidebarNav.vue'
import SidebarProPlan from './SidebarProPlan.vue';

const isOpen = ref(false)
const isMobile = ref(false)
const isMedium = ref(false)

const updateWindowSize = () => {
    const width = window.innerWidth
    isMobile.value = width < BREAKPOINTS.md
    isMedium.value = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg
    isOpen.value = width >= BREAKPOINTS.lg
}

const toggleSidebar = () => {
    isOpen.value = !isOpen.value
}

const closeSidebar = () => {
    if (isMobile.value) {
        isOpen.value = false
    }
}

onMounted(() => {
    updateWindowSize()
    window.addEventListener('resize', updateWindowSize)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateWindowSize)
})

defineExpose({
    toggleSidebar
})
</script>