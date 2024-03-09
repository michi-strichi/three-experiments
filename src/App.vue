<template>
    <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import setup from "./projects/setup";

const canvas = ref<HTMLCanvasElement>();
onMounted(() => {
    if (canvas.value) setup(canvas.value)
});
</script>

<style lang="scss" scoped>
canvas {
    width: 100vw;
    height: 100vh;
}
</style>./projects/scene./projects/setup
