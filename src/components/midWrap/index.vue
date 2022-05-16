<template>
  <div class="midWrap">
    <MidWrapHead />
    <MidWrapCanvas />
  </div>
</template>

<script setup lang="ts">
import MidWrapHead from "../midWrapHead/index.vue"
import MidWrapCanvas from "../midWrapCanvas"
</script>

<style scoped lang="less">
.midWrap {
  position: absolute;
  top: 20px;
  left: 340px;
  right: 370px;
  bottom: 0;
  height: calc(100% - 40px);
}
</style>
