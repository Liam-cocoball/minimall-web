<template>
    <ion-card>
        <ion-card-header>
            <div class="register-header">
                <ion-card-title>注册</ion-card-title>
                <a href="/login">已有帐号，去登陆</a>
            </div>

        </ion-card-header>

        <ion-card-content>
            <ion-list>
                <ion-item>
                    <ion-input ref="input" type="email" fill="solid" label="账号: " label-placement="floating"
                        placeholder="账号" helper-text="Enter a valid Account"
                        error-text="Invalid Account"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input ref="input" type="email" fill="solid" label="邮箱: " label-placement="floating"
                        placeholder="邮箱" helper-text="Enter a valid Account"
                        error-text="Invalid Email"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-input ref="input" type="password" fill="solid" label="密码: " label-placement="floating"
                        placeholder="登录密码" helper-text="Enter a valid Password"
                        error-text="Invalid Password"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-input ref="input" type="password" fill="solid" label="确认密码: " label-placement="floating"
                        placeholder="确认密码" helper-text="Enter a valid Password"
                        error-text="Invalid Password"></ion-input>
                </ion-item>
                <ion-button expand="block">登录</ion-button>
            </ion-list>
        </ion-card-content>
    </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle,IonButton,IonInput, IonItem, IonList } from '@ionic/vue';


</script>

<style scoped>
.register-header {
    display: flex;
    justify-content: space-between;
}
</style>