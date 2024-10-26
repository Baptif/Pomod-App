<template>
    <div>

        <SelectSessionTime v-if="!sessionIsStarted" @start-session="handleStartSession" />

        <Timer v-if="sessionIsStarted" :session-data="sessionData" @stop-session="handleStopSession"/>

    </div>
</template>

<script setup>
import { ref } from 'vue';

import SelectSessionTime from '@/components/SelectSessionTime.vue';
import Timer from '@/components/Timer.vue';

const sessionIsStarted = ref(false);
const sessionData = ref(null);

function handleStartSession(data) {
    sessionIsStarted.value = true;
    sessionData.value = data;
    // Traitez les données de session ici
}

function handleStopSession() {
    sessionIsStarted.value = false;
}
</script>

<style scoped></style>