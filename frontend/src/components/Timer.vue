<template>
    <div class="flex flex-col items-center justify-center frame">
        <div class="flex space-x-2 mb-3">
            <p :class="{ 'active-session': currentSession.name === 'pomodoro' }" class="text-lg p-2">
                Pomodoro {{ numberOfPomosDone }}/{{ sessionData.numberOfPomos }}
            </p>
            <p :class="{ 'active-session': currentSession.name === 'shortBreak' }" class="text-lg p-2">
                Short Break {{ numberOfShortBreaksDone }}/{{ sessionData.numberOfShortBreaks }}
            </p>
            <p :class="{ 'active-session': currentSession.name === 'longBreak' }" class="text-lg p-2">
                Long Break {{ numberOfLongBreaksDone }}/{{ sessionData.numberOfLongBreaks }}
            </p>
        </div>
        <div class="timer-wrapper">
            <svg class="timer-ring" width="200" height="200">
                <circle class="ring-background" cx="100" cy="100" r="90" />
                <circle class="ring-progress" cx="100" cy="100" r="90" :style="{ strokeDashoffset: circleDashOffset }"
                    stroke-dasharray="565.48" />
            </svg>
            <div class="timer-text">
                <h2 class="text-5xl">{{ minutes }}:{{ seconds < 10 ? '0' + seconds : seconds }}</h2>
            </div>
        </div>
        <div class="mt-4 space-x-4">
            <Button @click="toggleTimer" size="lg" class="text-lg">{{ buttonLabel }}</Button>
            <Button v-if="!isRunning" @click="stopAndResetSession" variant="destructive" size="icon">
                <ReloadIcon class="w-4 h-4" />
            </Button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, defineProps } from 'vue';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-icons/vue';

const props = defineProps({
    sessionData: {
        type: Object,
        required: true
    }
});

const sessions = {
    pomodoro: { name: 'pomodoro', duration: 1 * 60, onComplete: () => numberOfPomosDone.value++ },
    shortBreak: { name: 'shortBreak', duration: 5 * 60, onComplete: () => numberOfShortBreaksDone.value++ },
    longBreak: { name: 'longBreak', duration: 15 * 60, onComplete: () => numberOfLongBreaksDone.value++ }
};

// Session actuelle par défaut
const currentSessionName = ref('pomodoro');
const currentSession = computed(() => sessions[currentSessionName.value]);

const numberOfPomosDone = ref(0);
const numberOfShortBreaksDone = ref(0);
const numberOfLongBreaksDone = ref(0);

const pomosBeforeLongBreak = 4;

// Durée restante pour la session en cours
const timeLeft = ref(currentSession.value.duration);
const isRunning = ref(false);

const buttonLabel = computed(() => isRunning.value ? 'Pause' : 'Resume');

const minutes = computed(() => Math.floor(timeLeft.value / 60));
const seconds = computed(() => timeLeft.value % 60);

// Calculer le pourcentage du temps restant pour la barre circulaire
const circleRadius = 90;
const circleCircumference = 2 * Math.PI * circleRadius;

const circleProgress = computed(() => (timeLeft.value / currentSession.value.duration) * 100);
const circleDashOffset = computed(() => circleCircumference - (circleProgress.value / 100) * circleCircumference);

// Identifiant de l'intervalle pour le contrôle du timer
let intervalId = null;

const toggleTimer = () => {
    if (isRunning.value) {
        clearInterval(intervalId);
    } else {
        intervalId = setInterval(() => timeLeft.value--, 1000); // Décrémente le temps restant toutes les secondes
    }
    isRunning.value = !isRunning.value;
};

// Watch pour changer de session lorsque le timer atteint zéro
watch(timeLeft, (newVal) => {
    if (newVal < 0) {
        switchSession();
    }
});

const resetTimer = () => {
    clearInterval(intervalId);
    timeLeft.value = currentSession.value.duration;
    isRunning.value = false;
};

const switchSession = () => {
    currentSession.value.onComplete();

    if (currentSessionName.value === 'pomodoro') {
        currentSessionName.value = (numberOfPomosDone.value % pomosBeforeLongBreak === 0) ? 'longBreak' : 'shortBreak';
    } else {
        currentSessionName.value = 'pomodoro'; // Reviens toujours au Pomodoro après une pause
    }

    // Vérifie si toutes les sessions ont été effectuées
    if (numberOfPomosDone.value >= props.sessionData.numberOfPomos &&
        numberOfShortBreaksDone.value >= props.sessionData.numberOfShortBreaks &&
        numberOfLongBreaksDone.value >= props.sessionData.numberOfLongBreaks) {
        stopAndResetSession();
        return;
    }

    resetTimer();
    // Redémarre automatiquement le timer après avoir changé de session
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
        toggleTimer();
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
    toggleTimer(); // Active le timer automatiquement au chargement du composant
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    resetTimer();
});
</script>


<style scoped>
.frame {
    border: 1px solid lightgray;
    box-shadow: 2px 2px 2px lightgray;
    border-radius: 10px;
    padding: 1rem 2rem;
}

.active-session {
    background-color: #b22e2e;
    color: white;
    border-radius: 10px;
}

.timer-wrapper {
    position: relative;
    width: 200px;
    height: 200px;
}

.timer-ring {
    transform: rotate(-90deg);
}

.ring-background {
    fill: none;
    stroke: #e0e0e0;
    stroke-width: 12;
}

.ring-progress {
    fill: none;
    stroke: #b22e2e;
    stroke-width: 12;
    stroke-linecap: round;
    transition: stroke-dashoffset 1s linear;
}

.timer-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>