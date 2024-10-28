<template>
  <ion-card>
    <ion-card-header class="header">
      <ion-card-subtitle>
        <ion-icon :icon="logoApple"></ion-icon>
        <span> App账号 </span>
      </ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <div class="goods">
        <div class="item left">
          <img src="../assets/image.png" alt="图片">
        </div>
        <div class="item right">
          <div>美区 | 独享使用 | 苹果id | 推荐 | 稳</div>
          <div class="targ">
            <div>自动发货</div>
            <div>库存充足</div>
            <div>独享ID</div>
          </div>
          <div class="money">￥19.80</div>
        </div>
      </div>
      <div class="goods">
        <div class="item left">
          <img src="../assets/image.png" alt="图片">
        </div>
        <div class="item right">
          <div>美区 | 独享使用 | 苹果id | 推荐 | 稳</div>
          <div class="targ">
            <div>自动发货</div>
            <div>库存充足</div>
            <div>独享ID</div>
          </div>
          <div class="money">￥19.80</div>
        </div>
      </div>
      <div class="goods">
        <div class="item left">
          <img src="../assets/image.png" alt="图片">
        </div>
        <div class="item right">
          <div>美区 | 独享使用 | 苹果id | 推荐 | 稳</div>
          <div class="targ">
            <div>自动发货</div>
            <div>库存充足</div>
            <div>独享ID</div>
          </div>
          <div class="money">￥19.80</div>
        </div>
      </div>
    </ion-card-content>
  </ion-card>

  <ion-card>
    <ion-card-header class="header">
      <ion-card-subtitle>
        <ion-icon :icon="logoApple"></ion-icon>
        <span> 礼品卡 </span>
      </ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <div class="goods">
        <div class="item left">
          <img src="../assets/image.png" alt="图片">
        </div>
        <div class="item right">
          <div>美区 | 独享使用 | 苹果id | 推荐 | 稳</div>
          <div class="targ">
            <div>自动发货</div>
            <div>库存充足</div>
            <div>独享ID</div>
          </div>
          <div class="money">￥19.80</div>
        </div>
      </div>
      <div class="goods">
        <div class="item left">
          <img src="../assets/image.png" alt="图片">
        </div>
        <div class="item right">
          <div>美区 | 独享使用 | 苹果id | 推荐 | 稳</div>
          <div class="targ">
            <div>自动发货</div>
            <div>库存充足</div>
            <div>独享ID</div>
          </div>
          <div class="money">￥19.80</div>
        </div>
      </div>
      <div class="goods">
        <div class="item left">
          <img src="../assets/image.png" alt="图片">
        </div>
        <div class="item right">
          <div>美区 | 独享使用 | 苹果id | 推荐 | 稳</div>
          <div class="targ">
            <div>自动发货</div>
            <div>库存充足</div>
            <div>独享ID</div>
          </div>
          <div class="money">￥19.80</div>
        </div>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,IonIcon } from '@ionic/vue';

import { logoApple } from 'ionicons/icons';



</script>

<style scoped>
ion-card-subtitle {
  font-size: 16px;
}
ion-card-header{
  padding: 5px 0px 5px 0px;
}
ion-card-content {
  box-shadow: 0px -1px 1px 0px rgba(173, 170, 170, 0.5);
}

.goods {
  display: flex;
  box-shadow: 0px -1px 3px 0px rgba(173, 170, 170, 0.5);
  
}

.item {
  padding-top: 10px;
  font-size: 13px;
}

.goods:hover {
  cursor: pointer;
}

.left {
  width: 20%;
}

.left img {
  border-radius: 10px;
}

.right {
  width: 80%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}

.targ {
  display: flex;
}

.targ div {
  border: 1px solid pink;
  margin: 3px 0px 3px 0px;
  border-radius: 3px;
}

.money {
  color: red;
  font-size: 15px;
}
</style>