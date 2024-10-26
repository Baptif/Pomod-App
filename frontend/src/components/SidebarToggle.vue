<template>
    <button 
        @click="$emit('toggle')"
        class="absolute -right-3 top-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 shadow-md hover:shadow-lg transition-shadow duration-200"
    >
        <component 
            :is="isOpen ? ChevronLeftIcon : ChevronRightIcon" 
            class="h-4 w-4 text-gray-600 dark:text-gray-300" 
        />
    </button>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-icons/vue';


defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
})

defineEmits(['toggle'])
</script>