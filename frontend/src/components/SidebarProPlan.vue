<template>
    <div 
        class="border border-gray-200 rounded-lg" 
        :class="[ iconOnly ? 'flex justify-center m-2 p-3 cursor-pointer transition-colors duration-200 hover:bg-gray-100' : 'm-4 p-4']"
        v-bind="iconOnly ? { onClick: subscribeToProPlan } : {}"
    >
        <div class="flex items-center space-x-2">
            <RocketIcon class="text-red-600 w-6 h-6"/>
            <h3 v-if="!iconOnly" class="text-lg font-semibold text-gray-800">ProPlan</h3>
        </div>

        <div v-if="!iconOnly" class="mt-3">
            <p class="text-sm text-gray-600">
                Passez au ProPlan pour débloquer des fonctionnalités avancées, des statistiques détaillées,
                et un support prioritaire.
            </p>
            <button 
                @click="subscribeToProPlan"
                class="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
                Passer au Pro
            </button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { RocketIcon } from '@radix-icons/vue';

const props = defineProps({
    iconOnly: {
        type: Boolean,
        default: false,
    },
});

const router = useRouter();

function subscribeToProPlan() {
    console.log('Subscribe to ProPlan');
    router.push('/settings');
}
</script>