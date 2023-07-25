<template>
  <!-- 路由占位 -->
  <router-view />
</template>

<script setup>
// pnpm i vue-router
import { RouterView } from 'vue-router'
import useScalePage from '@/hooks/useScalePage'

const options = {
  targetX: 1920,
  targetY: 1080,
  targetRatio: 16 / 9,
}

// 大屏适配
useScalePage(options)
</script>

<style scoped></style>
