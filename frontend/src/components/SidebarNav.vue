<template>
    <nav class="flex flex-col gap-2 px-2 py-4">
        <SidebarItem 
            v-for="item in ROUTES" 
            :key="item.path" 
            v-bind="item" 
            :icon-only="iconOnly"
        />
    </nav>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue'
import { ROUTES } from '@/constants/routes'

defineProps({
    iconOnly: {
        type: Boolean,
        default: false
    }
})
</script>