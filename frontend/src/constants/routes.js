import { BarChartIcon, GearIcon, HomeIcon, InfoCircledIcon } from '@radix-icons/vue'
import DashboardView from '@/views/DashboardView.vue'
import AboutView from '@/views/AboutView.vue'
import SettingsView from '@/views/SettingsView.vue'
import ActivityView from '@/views/ActivityView.vue'

export const ROUTES = [
  { path: '/', component: DashboardView, title: 'Home', icon: HomeIcon },
  { path: '/info', component: AboutView, title: 'About', icon: InfoCircledIcon },
  { path: '/activity', component: ActivityView, title: 'Activity', icon: BarChartIcon },
  { path: '/settings', component: SettingsView, title: 'Settings', icon: GearIcon },
]
