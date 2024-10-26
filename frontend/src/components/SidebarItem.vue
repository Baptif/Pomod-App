<template>
    <router-link 
        :to="path"
        class="flex items-center p-3 text-gray-600 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg"
        :class="{ 'justify-center': !isOpen }"
    >
        <component 
            :is="icon" 
            class="h-5 w-5" 
            :class="{ 'mr-3': isOpen }" 
        />
        <span v-if="isOpen">{{ title }}</span>
    </router-link>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    icon: {
        type: Function,
        required: true
    },
    isOpen: {
        type: Boolean,
        default: true
    }
})
</script>