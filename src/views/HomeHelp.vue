<template>
  <ion-app>
    <ion-card>
      <div class="help-img">
        <img src="../assets/helpImage.png" alt="help">
      </div>

      <div class="help-content">
        <ion-card-header>
          <ion-card-title>↓ 选择你要查看的指南 ↓</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-accordion-group>
            <ion-accordion value="first">
              <ion-item slot="header" color="light">
                <ion-label>苹果账号相关问题</ion-label>
              </ion-item>
              <div class="ion-padding" slot="content">苹果ID哪个是账号？密码？密保？</div>
            </ion-accordion>
            <ion-accordion value="second">
              <ion-item slot="header" color="light">
                <ion-label>推特账号相关问题</ion-label>
              </ion-item>
              <div class="ion-padding" slot="content">苹果ID账号怎么登录？在哪登陆？</div>
            </ion-accordion>
            <ion-accordion value="third">
              <ion-item slot="header" color="light">
                <ion-label>TikTok账号相关问题</ion-label>
              </ion-item>
              <div class="ion-padding" slot="content">tiktok怎么修改密码？</div>
            </ion-accordion>
          </ion-accordion-group>

        </ion-card-content>

      </div>

    </ion-card>
  </ion-app>
</template>
<!-- ion-card-header -->
<script setup lang="ts">
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonApp,IonCardHeader,IonCardContent,IonCard,IonCardTitle } from '@ionic/vue';



</script>
<style scoped>
ion-card {
 overflow: scroll;
 
}
img{
  width: 100%;
}
.help-content{
  position: relative;
  top: -70px;
  width: 100%;
  background-color: white;
}

ion-card-title {
  text-align: center;
  margin-bottom: 30px;
}
</style>