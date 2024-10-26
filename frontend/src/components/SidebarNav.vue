<template>
    <nav class="flex flex-col gap-2 px-2 py-4">
        <SidebarItem 
            v-for="item in menuItems" 
            :key="item.path" 
            v-bind="item" 
            :is-open="isOpen"
        />
    </nav>
</template>

<script setup>
import { ref } from 'vue'
import SidebarItem from './SidebarItem.vue'
import { BarChartIcon, GearIcon, HomeIcon, InfoCircledIcon } from '@radix-icons/vue'

defineProps({
    isOpen: {
        type: Boolean,
        default: true
    }
})

const menuItems = ref([
    { title: 'Accueil', path: '/', icon: HomeIcon },
    { title: 'Statistiques', path: '/statistics', icon: BarChartIcon },
    { title: 'Informations', path: '/info', icon: InfoCircledIcon },
    { title: 'Paramètres', path: '/settings', icon: GearIcon }
])
</script>