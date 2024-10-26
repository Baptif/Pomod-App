<template>
    <aside 
        class="fixed left-0 top-0 h-full bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 z-10"
        :class="[isOpen ? 'w-64' : 'w-16']"
    >
        <SidebarToggle :is-open="isOpen" @toggle="$emit('toggle')" />
        <SidebarLogo :is-open="isOpen" />
        <SidebarNav :is-open="isOpen" />
    </aside>
</template>

<script setup>
import SidebarToggle from './SidebarToggle.vue'
import SidebarLogo from './SidebarLogo.vue'
import SidebarNav from './SidebarNav.vue'

defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
})

defineEmits(['toggle'])
</script>