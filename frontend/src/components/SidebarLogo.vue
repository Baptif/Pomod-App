<template>
    <div class="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center">
            <img src="@/assets/images/appicon.png" alt="Logo" class="h-8 w-8" />
            <span v-if="isOpen" class="ml-2 text-lg font-semibold text-gray-800 dark:text-white">
                Pomod'App
            </span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    isOpen: {
        type: Boolean,
        default: true
    }
})
</script>