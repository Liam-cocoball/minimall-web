<template>
   <ion-card>
      <ion-card-header>
         <ion-card-title class="unifiedColor">查询订单</ion-card-title>
      </ion-card-header>

      <ion-card-content>
         <div>
            <ion-input ref="input" type="email" v-model="email" fill="solid" label="邮箱:" label-placement="floating"
               helper-text="请输入有效的邮箱↑"></ion-input>
         </div>
         <div>
            <ion-button expand="block" @click="getOrder" >查询</ion-button>
            <ion-button size="small" @click="resetemail">重置</ion-button>
         </div>
         <div>

         </div>
      </ion-card-content>
   </ion-card>


   <ion-card>
      <ion-card-header>
         <ion-card-title>查询到的订单</ion-card-title>
      </ion-card-header>
      <ion-card-content>
         未查询到任何订单！
      </ion-card-content>
   </ion-card>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput,IonButton } from '@ionic/vue';
import { ref } from 'vue'
const email = ref('')
function resetemail(){
   email.value = ''
}
function getOrder(){
   if (email.value === ''){
      ElMessage.error('邮箱格式错误')
   }
}




</script>

<style scoped></style>