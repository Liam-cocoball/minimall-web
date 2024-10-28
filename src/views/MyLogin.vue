<template>
    <ion-card>
        <ion-card-header>
            <div class="login-header">
                <ion-card-title>登录</ion-card-title>
                <a href="/register">还没有账号，去注册</a>
            </div>
        </ion-card-header>

        <ion-card-content>
            <ion-list>
                <ion-item>
                    <ion-input ref="input" type="email" fill="solid" label="账号: " label-placement="floating"
                        placeholder="账号或邮箱" helper-text="Enter a valid Account"
                        error-text="Invalid Account"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-input ref="input" type="password" fill="solid" label="密码: " label-placement="floating"
                        placeholder="登录密码" helper-text="Enter a valid Password"
                        error-text="Invalid Password"></ion-input>
                </ion-item>
                <div class="forget">
                    <a href="#">忘记密码</a>
                </div>

                <ion-button expand="block">登录</ion-button>
            </ion-list>
        </ion-card-content>
    </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, IonItem, IonList, IonButton } from '@ionic/vue';

</script>

<style scoped>
ion-card {
    /* position: absolute;
    /* top: 0; */
    /* left: 0;
    bottom: 0;
    right: 0; */
    /* margin: auto 0; */
    padding-top: 30px;
}

ion-card-header {
    display: flex;
    justify-content: center;
}

ion-button {
    margin-top: 30px;
}

.forget {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

.login-header {
    display: flex;
    justify-content: space-between;
}

ion-card-title {
    /* text-align: center; */
}
</style>