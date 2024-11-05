<template>
    <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-14">
        <div class="flex items-center justify-between px-4 h-full">
            <!-- Menu Burger pour Mobile -->
            <button
                class="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg"
                @click="toggleSidebar">
                <MenuIcon class="h-6 w-6" />
            </button>

            <div class="flex items-center justify-center">
                <img src="@/assets/images/appicon.png" alt="Logo" class="h-8 w-8 mr-2" />
            </div>
        </div>
    </header>
</template>

<script setup>
import { MenuIcon } from 'lucide-vue-next';

const emit = defineEmits(['toggle-sidebar'])

const toggleSidebar = () => {
    emit('toggle-sidebar')
}
</script>