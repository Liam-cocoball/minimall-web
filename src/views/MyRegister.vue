<template>
    <ion-card>
        <ion-card-header>
            <div class="register-header">
                <ion-card-title class="unifiedColor">注册</ion-card-title>
                <a href="javascript:void(0);" @click="goLogin">已有帐号，去登陆</a>
            </div>
        </ion-card-header>

        <ion-card-content>
            <ion-list>
                <ion-item>
                    <ion-input ref="input" type="text" v-model="registerUser.account" fill="solid" label="账号: "
                        label-placement="floating" placeholder="账号" :helper-text="registerUserTip.account"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input ref="input" type="password" v-model="registerUser.password" fill="solid" label="密码: "
                        label-placement="floating" placeholder="登录密码"
                        :helper-text="registerUserTip.password"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-input ref="input" type="password" v-model="registerUser.okpassword" fill="solid" label="确认密码: "
                        label-placement="floating" placeholder="确认密码"
                        :helper-text="registerUserTip.okpassword"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input ref="input" type="email" v-model="registerUser.email" fill="solid" label="邮箱: "
                        label-placement="floating" placeholder="邮箱" :helper-text="registerUserTip.email"></ion-input>
                </ion-item>
                <ion-button expand="block" @click="register">登录</ion-button>
            </ion-list>
        </ion-card-content>
    </ion-card>
</template>

<script setup lang="ts">
import { reactive, onBeforeUnmount } from "vue"
import axios from 'axios'
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonInput, IonItem, IonList } from '@ionic/vue';
import { useRouter } from 'vue-router'
// 收集用户注册数据
const registerUser = reactive({
    account: '',
    password: '',
    okpassword: '',
    email: '',
})
// 错误提示
const registerUserTip = reactive({
    account: '字母开头,长度在4~12,只能包含字母数字下划线',
    password: '字母开头,长度在6~18,只能包含字母、数字和下划线',
    okpassword: '字母开头,长度在6~18,只能包含字母、数字和下划线',
    email: '支持QQ、网易、谷歌等邮箱',
})
const timer = setInterval(() => {
    registerUserTip.account = '字母开头,长度在4~12,只能包含字母数字下划线'
    registerUserTip.password = '字母开头,长度在6~18,只能包含字母、数字和下划线'
    registerUserTip.okpassword = '字母开头,长度在6~18,只能包含字母、数字和下划线'
    registerUserTip.email = '支持QQ、网易、谷歌等邮箱'
}, 1000 * 5)

onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer)
    }
})
// 注册
function register() {
    if ((registerUser.account === "" || registerUser.account.length < 4)) {
        registerUserTip.account = '请输入有效的账户'
        return
    }
    if (registerUser.password === "" || registerUser.password.length < 6) {
        registerUserTip.password = '请输入有效的密码'
        return
    }
    if (registerUser.okpassword === "" || registerUser.okpassword.length < 6) {
        registerUserTip.okpassword = '请输入有效的密码'
        return
    }
    if (registerUser.email === "") {
        registerUserTip.email = '请输入有效的密码'
        return
    }
    if (!(registerUser.password === registerUser.okpassword)) {
        registerUserTip.okpassword = '两次输入的密码不一致'
        return
    }

    axios({
        method: 'post',
        url: '/api/v1/register',
        data: registerUser
    }).then(
        (response) => {
            if ((response.data.code === 500)) {
                registerUserTip.account = response.data.message
                return
            }
            if ((response.data.code === 501)) {
                const tipappry = response.data.data
                for (let i = 0; i < tipappry.length; i++) {
                    const item = tipappry[i]
                    if ('account' === (item.path)) {
                        registerUserTip.account = item.msg
                    } else if ('password' === (item.path)) {
                        registerUserTip.password = item.msg
                    } else if ('okpassword' === (item.path)) {
                        registerUserTip.okpassword = item.msg
                    } else {
                        registerUserTip.email = item.msg
                    }
                }
                return
            }
            // 跳转登录页面
            router.push('/login')
        },
        (err) => {
            alert(err)
        })
}

const router = useRouter()
function goLogin() {
    router.push('/login')
}
</script>

<style scoped>
.register-header {
    display: flex;
    justify-content: space-between;
}
</style>