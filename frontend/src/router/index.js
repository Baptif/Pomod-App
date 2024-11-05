import { createRouter, createMemoryHistory } from 'vue-router'
import { ROUTES } from '@/constants/routes'

const router = createRouter({
    history: createMemoryHistory(),
    routes: ROUTES,
})

export default router
