<template>
  <ion-card>
    <ion-card-content>
      <div class="banner">
        <div class="item item1">
          <div>
            <img src="../assets/1.png" alt="图片">
          </div>
          <span>苹果账号</span>
        </div>

        <div class="item item1">
          <div>
            <img src="../assets/2.png" alt="图片">
          </div>
          <span>礼品卡</span>
        </div>

        <div class="item item1">
          <div>
            <img src="../assets/3.png" alt="图片">
          </div>
          <span>推特账号</span>
        </div>

        <div class="item item1">
          <div>
            <img src="../assets/4.png" alt="图片">
          </div>
          <span>谷歌账号</span>
        </div>

        <div class="item item1">
          <div>
            <img src="../assets/5.png" alt="图片">
          </div>
          <span>INS账号</span>
        </div>

        <div class="item item1">
          <div>
            <img src="../assets/6.png" alt="图片">
          </div>
          <span>Tiktok</span>
        </div>
        <div class="item item1">
          <div>
            <img src="../assets/7.png" alt="图片">
          </div>
          <span>脸书账号</span>
        </div>
        <div class="item item1">
          <div>
            <img src="../assets/8.png" alt="图片">
          </div>
          <span>Youtube</span>
        </div>
        <div class="item item1">
          <div>
            <img src="../assets/9.png" alt="图片">
          </div>
          <span>App下载</span>
        </div>
        <div class="item item1">
          <div>
            <img src="../assets/10.png" alt="图片">
          </div>
          <span>全部账号</span>
        </div>

        
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent } from '@ionic/vue';

</script>

<style scoped>
.banner{
  display: flex;
  flex-wrap: wrap;
}
.item{
  text-align: center;
  width: 20%;
}
.item:hover{
  cursor: pointer;
}
span{
  font-size: 12px;
}
</style>