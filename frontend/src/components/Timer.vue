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
            <svg class="timer-ring" :width="timerRingSize" :height="timerRingSize">
                <circle :cx="timerRingHalfSize" :cy="timerRingHalfSize" r="140" class="circle" />

                <g class="ticks">
                    <rect v-for="n in totalTicks" :key="n" :class="{ 'active-tick': n <= activeTicks }"
                        :transform="'rotate(' + ((n - 1) * (360 / totalTicks)) + ' ' + timerRingHalfSize + ' ' + timerRingHalfSize + ')'"
                        x="145" y="20" width="9" height="26" rx="6" ry="6" />
                </g>
            </svg>
            <div class="timer-text">
                <h2 class="text-6xl">{{ minutes < 10 ? '0' + minutes : minutes }}:{{ seconds < 10 ? '0' + seconds :
                    seconds }}</h2>
            </div>
        </div>
        <div class="mt-4">
            <Button v-show="!isRunning" @click="stopAndResetSession" variant="secondary" size="icon" class="mr-2">
                <ReloadIcon class="w-5 h-5" />
            </Button>
            <Button @click="toggleTimer" size="xl" variant="gradient" class="text-xl">{{ buttonLabel }}</Button>
            <Button v-show="!isRunning" @click="stopAndResetSession" variant="secondary" size="icon" class="ml-2">
                <ReloadIcon class="w-5 h-5" />
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
    pomodoro: { name: 'pomodoro', duration: 5 * 60, onComplete: () => numberOfPomosDone.value++ },
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

const buttonLabel = computed(() => isRunning.value ? 'PAUSE' : 'RESUME');

const minutes = computed(() => Math.floor(timeLeft.value / 60));
const seconds = computed(() => timeLeft.value % 60);

// Calculer le nombre de ticks actifs (colorés) en fonction du temps restant
const totalTicks = ref(24);
const activeTicks = computed(() => {
    const percentageComplete = (currentSession.value.duration - timeLeft.value) / currentSession.value.duration;
    return Math.max(1, Math.floor(percentageComplete * totalTicks.value));
});
const timerRingSize = 300;
const timerRingHalfSize = timerRingSize / 2;

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
}

.circle {
    /* fill: #f5f5f5; */
    fill: none;
    stroke: #dbdbdb;
    stroke-width: 2;
}

.ticks {
    fill: #dbdbdb;
}

.active-tick {
    fill: #b22e2e;
}

.timer-text {
    position: absolute;
    top: 49%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgb(65, 65, 65);
}
</style>