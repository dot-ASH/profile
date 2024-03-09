<script setup lang="ts">
import { LoadingKeys } from '@/keys/Symbols';
import type { LoadingProps } from '@/types/LoadingProps';
import { inject, onMounted } from 'vue';

const { loading } = inject(LoadingKeys) as LoadingProps

</script>

<template>
    <div>
        <div v-if="loading" id="loadingScreen" className="loadingScreen">
            <img src="/icon.png" className="loadingLogo" />
        </div>

    </div>

</template>

<style scoped>
.loadingScreen {
    position: fixed;
    display: flex;
    height: 100vh;
    width: 100vw;
    z-index: 5000;
    background-color: #dcdcdcdf;
    align-items: center;
    transition: 500ms ease-in;
}

.loadingLogo {
    margin: auto auto;
    width: 10em;
    animation: loading infinite 15s linear;
}

@keyframes loading {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
