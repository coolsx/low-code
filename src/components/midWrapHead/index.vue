<template>
  <ul class="midWrapHead">
    <li @click="operate('cancel')">
      <div><LeftCircleTwoTone style="fontSize: 40px" /></div>
      <div><a-button type="link">撤回</a-button></div>
    </li>
    <li @click="operate('redo')">
      <div><RightCircleTwoTone style="fontSize: 40px" /></div>
      <div><a-button type="link">重做</a-button></div>
    </li>
    <li @click="operate('delete')">
      <div><DeleteTwoTone style="fontSize: 40px" /></div>
      <div><a-button type="link">删除</a-button></div>
    </li>
    <li @click="operate('top')">
      <div><EyeTwoTone style="fontSize: 40px" /></div>
      <div><a-button type="link">置顶</a-button></div>
    </li>
    <li @click="operate('bottom')">
      <div><EyeInvisibleTwoTone style="fontSize: 40px" /></div>
      <div><a-button type="link">置底</a-button></div>
    </li>
    <li @click="operate('import')">
      <div><FileAddTwoTone style="fontSize: 40px" /></div>
      <div><a-button type="link">导入</a-button></div>
    </li>
    <li @click="operate('export')">
      <div><FolderOpenTwoTone style="fontSize: 40px" /></div>
      <div><a-button type="link">导出</a-button></div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import {
  LeftCircleTwoTone,
  RightCircleTwoTone,
  FileAddTwoTone,
  FolderOpenTwoTone,
  EyeTwoTone,
  EyeInvisibleTwoTone,
  DeleteTwoTone
} from "@ant-design/icons-vue"
function operate(n: string) {
  alert("开发中")
}
</script>

<style lang="less" scoped>
.midWrapHead {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  li {
    list-style: none;
    margin: 0 20px;
    cursor: pointer;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
