<script setup lang="ts">

import { homeOutline, readerOutline, chatbubblesOutline, happyOutline } from 'ionicons/icons';
import { RouterView, useRouter } from 'vue-router'
import {
    IonIcon,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonButtons,
    IonContent,
    IonHeader,
    IonMenu,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/vue';
// 路由器
const router = useRouter()

function goHome() {
    router.push('/home')
}
function goOrder() {
    router.push('/order')
}
function goHelp() {
    router.push('/help')
}
function goMy() {
    router.push('/login')
}
function goRigister() {
    router.push('/register')
}
function goLogin() {
    router.push('/login')
}


</script>

<template>
    <ion-menu content-id="main-content" style="background-color: F8F8F8;">
        <ion-header>
            <ion-toolbar color="tertiary">
                <ion-title>cocoball</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <!-- 顶部导航栏 -->
            <ion-accordion-group popper-class="top-nav" aria-hidden="true">
                <ion-accordion value="first">
                    <div @click="goHome" class="ion-padding" slot="header">首页</div>
                </ion-accordion>
                <ion-accordion value="second">
                    <div @click="goOrder" class="ion-padding" slot="header">查找订单</div>
                </ion-accordion>
                <ion-accordion value="third">
                    <ion-item slot="header" color="light">
                        <ion-label>会员中心</ion-label>
                    </ion-item>
                    <div @click="goRigister" class="ion-padding" slot="content">登录</div>
                    <div @click="goLogin" class="ion-padding" slot="content">注册</div>
                </ion-accordion>
            </ion-accordion-group>


        </ion-content>
    </ion-menu>
    <ion-page id="main-content">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title>mini mall</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <RouterView></RouterView>
            <!-- 底部菜单栏 -->
            <div class="footer">
                <div class="item item1" @click="goHome">
                    <div class="item-nav">
                        <ion-icon :icon="homeOutline"></ion-icon>
                    </div>
                    <div class="item-nav">
                        <!-- <RouterLink to="/home">查账</RouterLink> -->
                        <!-- <ion-button   fill="clear" router-link="/home">首页</ion-button> -->
                        <span>首页</span>
                    </div>
                </div>
                <div class="item item1" @click="goOrder">
                    <div class="item-nav">
                        <ion-icon :icon="readerOutline"></ion-icon>
                    </div>
                    <div class="item-nav">
                        <!-- <ion-button fill="clear" router-link="/oder" >查账</ion-button> -->
                        <span>查账</span>
                    </div>
                </div>
                <div class="item item1" @click="goHelp">
                    <div class="item-nav">
                        <ion-icon :icon="chatbubblesOutline"></ion-icon>
                    </div>
                    <div class="item-nav">
                        <span>教程</span>
                    </div>
                </div>
                <div class="item item1" @click="goMy">
                    <div class="item-nav">
                        <ion-icon :icon="happyOutline"></ion-icon>
                    </div>
                    <div class="item-nav">
                        <span>我的</span>
                    </div>
                </div>

            </div>

        </ion-content>
    </ion-page>

</template>


<style scoped>

ion-title,ion-accordion {
    color: black;
    background-color: #F4F5F8;
}
ion-content{
    padding: 0px;
}
ion-icon {
    font-size: 24px;
}

.footer {
    padding-top: 3px;
    width: 100%;
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0px;
    justify-content: space-around;
    box-shadow: 0px -1px 3px 0px rgba(173, 170, 170, 0.5);
    background-color: white;
    z-index: 999;
}

.footer .item {
    text-align: center;
}

.item:hover {
    cursor: pointer;
}
</style>