<template>
    <router-link 
        :to="path"
        class="flex items-center text-gray-600 transition-colors duration-50 hover:bg-gray-100 hover:text-gray-900 hover:font-semibold rounded-lg relative"
        :class="[
            iconOnly && isActiveRoute(path) ? 'p-3 bg-gray-100 text-gray-900 icon-active-border' : '',
            !iconOnly && isActiveRoute(path) ? 'px-4 py-3 border-r-8 bg-gray-100 border-red-600 text-gray-900 font-semibold' : '',
            iconOnly && !isActiveRoute(path) ? 'p-3' : '',
            !iconOnly && !isActiveRoute(path) ? 'px-4 py-3' : ''
        ]"
    >
        <component 
            :is="icon" 
            class="h-6 w-6" 
            :class="{ 'mr-3': !iconOnly }" 
        />
        <span v-if="!iconOnly" class="whitespace-nowrap">{{ title }}</span>
    </router-link>
</template>

<script setup>
import { useRoute } from 'vue-router'

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
    iconOnly: {
        type: Boolean,
        default: false
    }
})

const route = useRoute()

function isActiveRoute(path) {
    return route.path === path;
}
</script>

<style scoped>
.icon-active-border::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 6px;
    background-color: #dc2626;
}
</style>