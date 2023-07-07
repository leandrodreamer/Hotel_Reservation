<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderVue from './components/Header.vue';
</script>

<template>
  <HeaderVue />
  <RouterView v-slot="{Component}">
    <Transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </Transition>
  </RouterView>
  
</template>
