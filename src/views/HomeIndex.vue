<template>
    <!-- 头部提示 -->
    <TopTip></TopTip>
    <!-- 通知 -->
    <HorseRaceLamp></HorseRaceLamp>
    <!-- 宫格 -->
    <HomeBanner></HomeBanner>
    <!-- 商品 -->
    <HomeGoods></HomeGoods>
    <!-- 版权信息 -->
    <HomeFooter />
</template>

<script setup lang="ts">
// import { IonCard, IonCardContent } from '@ionic/vue';
import TopTip from './TopTip.vue'
import HorseRaceLamp from './HorseRaceLamp.vue'
import HomeFooter from './HomeFooter.vue';
import HomeBanner from './HomeBanner.vue';
import HomeGoods from './HomeGoods.vue';

</script>

<style scoped>
ion-menu::part(backdrop) {
    background-color: rgba(255, 0, 255, 0.5);
}

ion-menu::part(container) {
    border-radius: 0 20px 20px 0;
    box-shadow: 4px 0px 16px rgba(255, 0, 255, 0.18);
}
</style>