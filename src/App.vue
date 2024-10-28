<template>
  <ion-app>
    <HomePage></HomePage>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp } from '@ionic/vue';
import HomePage from './views/HomePage.vue';
</script>

<style>
ion-card-title {
  font-size: 18px;

}

ion-card-content {
  color: black;
}
</style>