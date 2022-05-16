<template>
  <div class="app">
    <LeftWrap />
    <MidWrap />
    <RightWrap />
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from "vue"
import LeftWrap from "./components/leftWrap/index"
import MidWrap from "./components/midWrap/index.vue"
import RightWrap from "./components/rightWrap/index"
import { IState } from "./types"
const state = ref<IState>({
  canvas: {
    width: 1100,
    height: 1800,
  },
  blocks: [],
})
provide("state", state.value)
</script>

<style lang="less">
.app {
  height: 100vh;
  position: relative;
}
</style>
