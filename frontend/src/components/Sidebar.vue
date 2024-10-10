<template>
    <aside class="sidebar">
        <nav class="sidebar-menu">
            <ul>
                <li>
                    <RouterLink to="/" active-class="active-link">
                        <HomeIcon class="w-6 h-6" />
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/settings" active-class="active-link">
                        <GearIcon class="w-6 h-6" />
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/about" active-class="active-link">
                        <InfoCircledIcon class="w-6 h-6" />
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/statistics" active-class="active-link">
                        <BarChartIcon class="w-6 h-6" />
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup>
import { BarChartIcon, GearIcon, HomeIcon, InfoCircledIcon } from '@radix-icons/vue';


</script>

<style scoped>
.sidebar {
    width: 50px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    top: 35%;
}

.sidebar-menu {
    flex-grow: 1;
}

.sidebar-menu ul {
    list-style: none;
    padding: 0;
}

.sidebar-menu li {
    display: flex;
    justify-content: center;
    margin: 10px 0;
}

.sidebar-menu a {
    text-decoration: none;
    color: #b22e2e;
    display: flex;
    align-items: center;
    padding: 5px;
}

.sidebar-menu a:hover {
    color: white;
    background-color: #b22e2e;
    border-radius: 5px;
}

.active-link {
    background-color: #b22e2e;
    border-radius: 5px;
}

.active-link :first-child {
    color: white;
}
</style>