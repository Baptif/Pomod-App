<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
        <h1 class="text-4xl font-bold">Timer</h1>
        <div class="my-6">
            <h2 class="text-6xl">{{ minutes }}:{{ seconds < 10 ? '0' + seconds : seconds }}</h2>
        </div>
        <div class="mt-4 space-x-4">
            <Button @click="toggleTimer" size="lg" class="text-lg">{{ textToggleButton }}</Button>
            <Button @click="stopAndResetSession" variant="destructive" size="icon">
                <ReloadIcon class="w-4 h-4" />
            </Button>
        </div>

        <p class="mt-4 text-lg">{{ sessionStatus }}</p>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, defineProps } from 'vue';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-icons/vue'

const props = defineProps({
    sessionData: {
        type: Object,
        required: true
    }
});

const workDuration = ref(25 * 60); // Durée de la session de travail en secondes (25 minutes)
const breakDuration = ref(5 * 60); // Durée de la pause en secondes (5 minutes)
const timeLeft = ref(workDuration.value); // !Important! Temps restant, initialisé à la durée de travail
const isRunning = ref(false); // Indique si le timer est en cours d'exécution
const isWorkSession = ref(true); // Indique si la session actuelle est de travail ou une pause
const textToggleButton = ref('Pause');

// Identifiant de l'intervalle pour le contrôle du timer
let intervalId = null;

const minutes = computed(() => Math.floor(timeLeft.value / 60));
const seconds = computed(() => timeLeft.value % 60);
const sessionStatus = computed(() => (isWorkSession.value ? 'Work Session' : 'Break Time'));

const toggleTimer = () => {
    if (!isRunning.value) {
        isRunning.value = true;
        textToggleButton.value = 'Pause';
        // Crée un intervalle qui appelle la fonction countdown chaque seconde (1000ms)
        intervalId = setInterval(countdown, 1000);
    } else {
        isRunning.value = false;
        textToggleButton.value = 'Resume';
        clearInterval(intervalId);
    }
};

const resetTimer = () => {
    isRunning.value = false;
    textToggleButton.value = 'Start';
    clearInterval(intervalId);
    // Réinitialise le temps restant en fonction du type de session (travail ou pause)
    timeLeft.value = isWorkSession.value ? workDuration.value : breakDuration.value;
};

const countdown = () => {
    if (timeLeft.value > 0) {
        timeLeft.value--;
    } else {
        switchSession();
    }
};

const switchSession = () => {
    isWorkSession.value = !isWorkSession.value;
    // Redémarre automatiquement le timer après avoir changé de session
    resetTimer();
    toggleTimer();
};

const emits = defineEmits(['stop-session']);

const stopAndResetSession = () => {
    resetTimer();
    emits('stop-session');
};

const handleKeydown = (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        toggleSession();
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
    toggleTimer();
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    resetTimer();
});
</script>

<style scoped></style>