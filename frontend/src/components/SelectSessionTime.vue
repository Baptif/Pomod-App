<template>
    <div class="flex flex-col items-center justify-center frame">
        <h1 class="text-4xl font-bold mb-4">Focus time</h1>

        <h2 class="text-3xl font-semibold my-4">{{ sessionTimeReadable }}</h2>
        <Slider v-model="pomosNbForSession" :min="1" :max="maxPomosNb" :step="1"
            :class="cn('w-2/5', $attrs.class ?? '')" />

        <div class="mt-4">
            <p>WORK : {{ numberOfPomos }} x {{ workDurationDefault }}min</p>
            <p>BREAK : {{ numberOfShortBreaks }} x {{ shortBreakDurationDefault }}min <span
                    v-if="numberOfLongBreaks > 0">/ {{
                        numberOfLongBreaks }} x {{ longBreakDurationDefault }}min</span></p>
        </div>

        <div class="mt-4 space-x-4">
            <Button @click="startSession" size="lg" class="text-lg">Start</Button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import { cn } from '@/lib/utils'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'

// Valeurs paramétrables par la suite
const workDurationDefault = ref(25);
const shortBreakDurationDefault = ref(5);
const longBreakDurationDefault = ref(15);

const maxPomosNb = ref(10);
const pomosNbForSession = ref([2])

const numberOfPomos = computed(() => pomosNbForSession.value[0]);
const numberOfShortBreaks = computed(() => pomosNbForSession.value - Math.floor(pomosNbForSession.value / 4));
const numberOfLongBreaks = computed(() => Math.floor(pomosNbForSession.value / 4));

const sessionTimeReadable = computed(() => {
    // Ex : 4 * 25 + (4/4) * 15 + (4 - 4/4) * 5 = 100 + 1*15 + 3*5 = 130
    const totalTimeMin = pomosNbForSession.value * workDurationDefault.value +
        numberOfLongBreaks.value * longBreakDurationDefault.value +
        numberOfShortBreaks.value * shortBreakDurationDefault.value;

    const hours = Math.floor(totalTimeMin / 60);
    const minutes = totalTimeMin % 60; // Minutes restantes

    return `${hours}h${minutes < 10 ? '0' + minutes : minutes}`; // Format HH:MM
});


const emits = defineEmits(['start-session']);

function startSession() {
    emits('start-session', {
        numberOfPomos: numberOfPomos.value,
        numberOfShortBreaks: numberOfShortBreaks.value,
        numberOfLongBreaks: numberOfLongBreaks.value
    });
}
</script>

<style scoped>
.frame {
    border: 1px solid lightgray;
    box-shadow: 2px 2px 2px lightgray;
    border-radius: 10px;
    padding: 1rem 2rem;
}
</style>