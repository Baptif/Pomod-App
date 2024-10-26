import { createRouter, createMemoryHistory } from 'vue-router'
import Dashboard from '@/views/DashboardView.vue'
import Settings from '@/views/SettingsView.vue'
import About from '@/views/AboutView.vue'
import Statistics from '@/views/StatisticsView.vue'

const routes = [
    { path: '/', component: Dashboard },
    { path: '/settings', component: Settings },
    { path: '/info', component: About },
    { path: '/statistics', component: Statistics }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router
