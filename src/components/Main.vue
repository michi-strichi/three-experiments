<template>
    <canvas></canvas>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import init from "../scripts/init";

onMounted(() => init())
</script>

<style lang="scss" scoped>
canvas {
    width: 100vw;
    height: 100vh;
}
</style>