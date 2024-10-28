<template>
   <ion-card>
      <ion-card-header>
         <ion-card-title>查询订单</ion-card-title>
      </ion-card-header>

      <ion-card-content>
         <div>
            <ion-input ref="input" type="email" fill="solid" label="邮箱/手机号" label-placement="floating"
               helper-text="Enter a valid email/phone" error-text="Invalid email" @ionInput="validate('')"
               @ionBlur="markTouched"></ion-input>
         </div>
         <div>
            <ion-button expand="block" size="small">查询</ion-button>
            <ion-button color="medium" size="small">重置</ion-button>
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

import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput,IonButton } from '@ionic/vue';
import { ref } from 'vue'

function validateEmail(email: string) {
   return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
   );
}
const input = ref()

function validate(ev: string) {
   // const value = ev.target.value;
   const value = ev
   input.value.$el.classList.remove('ion-valid');
   input.value.$el.classList.remove('ion-invalid');
   if (value === '') return;
   validateEmail(value)
      ? input.value.$el.classList.add('ion-valid')
      : input.value.$el.classList.add('ion-invalid');
}

function markTouched() {
   input.value.$el.classList.add('ion-touched');
}


</script>

<style scoped></style>