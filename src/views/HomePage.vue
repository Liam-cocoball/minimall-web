<script setup lang="ts">

import { homeOutline, readerOutline, chatbubblesOutline, happyOutline } from 'ionicons/icons';
import { RouterView, useRouter } from 'vue-router'
import {
    IonApp,
    IonIcon,
    IonAccordion,
    IonAccordionGroup,
    IonButtons,
    IonContent,
    IonHeader,
    IonMenu,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/vue';
import { onMounted, ref } from 'vue';



const isLogin = ref(false)
const tip = ref(['unifiedColor', '', '', ''])

onMounted(() => {
    if (localStorage.getItem('token') !== null) {
        isLogin.value = true
    }
})
// 路由器
const router = useRouter()
function cleartip() {
    for (let index = 0; index < tip.value.length; index++) {
        tip.value[index] = ''
    }
}
function goHome(index: number) {
    router.push('/home-goods')
    cleartip()
    tip.value[index] = 'unifiedColor'
}
function goOrder(index: number) {
    router.push('/order')
    cleartip()
    tip.value[index] = 'unifiedColor'
}
function goHelp(index: number) {
    router.push('/help')
    cleartip()
    tip.value[index] = 'unifiedColor'
}
function goMy(index: number) {
    router.push('/login')
    cleartip()
    tip.value[index] = 'unifiedColor'
}
function goRigister(index: number) {
    router.push('/register')
    cleartip()
    tip.value[index] = 'unifiedColor'
}
function goLogin(index: number) {
    router.push('/login')
    cleartip()
    tip.value[index] = 'unifiedColor'
}
function goCenter(index: number) {
    router.push('/my-center')
    cleartip()
    tip.value[index] = 'unifiedColor'
}

</script>

<template>
    <ion-app>
        <!-- aria-hidden="false" -->
        <ion-menu content-id="main-content">
            <ion-header>
                <ion-toolbar>
                    <ion-title>cocoball-vip</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
                <!-- 顶部导航栏 -->
                <ion-accordion-group>
                    <ion-accordion value="first">
                        <div slot="header" class="header" @click="goHome(0)">
                            <span>首页</span>
                        </div>
                    </ion-accordion>
                    <ion-accordion value="second">
                        <div slot="header" class="header" @click="goOrder(1)">
                            <span>查找订单</span>
                        </div>
                    </ion-accordion>
                    <ion-accordion value="third">
                        <div slot="header" class="header">
                            <span>会员中心</span>
                        </div>
                        <div slot="content">
                            <div @click="goLogin(3)" v-if="!isLogin" class="ion-padding" slot="content">
                                <span>登录</span>
                            </div>
                            <div @click="goRigister(3)" v-if="!isLogin" class="ion-padding" slot="content">
                                <span>注册</span>
                            </div>
                            <div @click="goCenter(3)" v-if="isLogin" class="ion-padding" slot="content">
                                <span>个人中心</span>
                            </div>
                        </div>
                    </ion-accordion>
                </ion-accordion-group>
            </ion-content>
        </ion-menu>
        <ion-page id="main-content">
            <!-- 头部 -->
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-menu-button></ion-menu-button>
                    </ion-buttons>
                    <ion-title @click="goHome(0)">
                        <b class="unifiedColor">mini mall</b>
                    </ion-title>
                </ion-toolbar>
            </ion-header>
            <!-- 内容和底部 -->
            <ion-content class="ion-padding" style="padding-inline-start: 0px;">
                    <!-- 版心 -->
                    <RouterView></RouterView>

                    <!-- 底部菜单栏 -->
                    <div class="footer">
                        <div class="item item1" @click="goHome(0)" :class="tip[0]">
                            <div class="item-nav">
                                <ion-icon :icon="homeOutline"></ion-icon>
                            </div>
                            <div class="item-nav">
                                <span>首页</span>
                            </div>
                        </div>
                        <div class="item item1" @click="goOrder(1)" :class="tip[1]">
                            <div class="item-nav">
                                <ion-icon :icon="readerOutline"></ion-icon>
                            </div>
                            <div class="item-nav">
                                <!-- <ion-button fill="clear" router-link="/oder" >查账</ion-button> -->
                                <span>查账</span>
                            </div>
                        </div>
                        <div class="item item1" @click="goHelp(2)" :class="tip[2]">
                            <div class="item-nav">
                                <ion-icon :icon="chatbubblesOutline"></ion-icon>
                            </div>
                            <div class="item-nav">
                                <span>指南</span>
                            </div>
                        </div>
                        <div class="item item1" @click="goMy(3)" :class="tip[3]">
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
    </ion-app>
</template>


<style scoped>

.custom-backtop {
  position: fixed !important; /* 使用 !important 来确保覆盖默认样式 */
  right: 100px; /* 自定义右边距 */
  bottom: 500px; /* 自定义底边距 */
  /* 其他自定义样式 */
}

ion-menu-button {
    --ion-color-primary: #6815ec;
}

ion-app {
    max-width: 560px;
    border: 1px solid rgb(255, 228, 228);
    margin: 0 auto;
}

ion-title,
ion-accordion {
    color: black;
}

ion-title b:hover {
    cursor: pointer;
}

ion-content {
    --padding-top: 0;

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

.ion-padding {
    --padding-start: 0;
    --padding-end: 0;

}

.header,
.content {
    margin: 5px 0px 5px 0px;
    padding: 5px 0px 5px 0px;
    box-shadow: 0px 1px 1px 0px rgba(173, 170, 170, 0.5);
}

ion-accordion-group {
    text-align: center
}
</style>