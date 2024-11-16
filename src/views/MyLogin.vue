<template>
    <ion-card v-if="loading">
        登录中...
    </ion-card>
    <ion-card v-else>
        <ion-card-header>
            <div class="login-header">
                <ion-card-title class="unifiedColor">登录</ion-card-title>
                <a href="javascript:void(0);" @click="goRegister">还没有账号，去注册</a>
            </div>
        </ion-card-header>

        <ion-card-content>
            <ion-list>
                <ion-item>
                    <ion-input ref="input" type="email" fill="solid" v-model="user.account" label="账号: " focus
                        label-placement="floating" placeholder="账号或邮箱" :helper-text="userTip.account"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-input ref="input" type="password" fill="solid" v-model="user.password" label="密码: "
                        label-placement="floating" placeholder="登录密码" :helper-text="userTip.password"></ion-input>
                </ion-item>
                <div class="forget">
                    <a href="javascript:void(0);" @click="forgetPassword">忘记密码</a>
                </div>

                <ion-button expand="block" @click="Login">登录</ion-button>

            </ion-list>
        </ion-card-content>
    </ion-card>

</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

import { reactive, onMounted, onBeforeUnmount, ref } from "vue"
import axios from 'axios'
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, IonItem, IonList, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router'

// 收集登录数据
const user = reactive({
    account: '',
    password: ''
})
// 页面消息提示
const userTip = reactive({
    account: '请输入账号',
    password: '请输入密码'
})
const timer = setInterval(() => {
    userTip.account = '请输入账号'
    userTip.password = '请输入密码'
}, 1000 * 5)
const loading = ref(false)

onMounted(() => {
    // 有token 去 个人中心
    if (localStorage.getItem('token') !== null) {
        router.push('/mycenter')
    }
})
onBeforeUnmount(() => {
    if (timer) {
        clearInterval(timer)
    }
})
// -----------后端方法-----------
// 登录
async function Login() {
    if ((user.account === "" || user.account.length < 4)) {
        userTip.account = '请输入有效的账户'
        return
    }
    if (user.password === "" || user.password.length < 4) {
        userTip.password = '请输入有效的密码'
        return
    }
    loading.value = true
    await axios({
        method: 'post',
        url: '/api/v1/login',
        data: user
    }).then(
        (response) => {
            if ((response.data.code === 500)) {
                userTip.account = response.data.message
                userTip.password = response.data.message
                return
            }
            if ((response.data.code === 501)) {
                const tipappry = response.data.data
                for (let i = 0; i < tipappry.length; i++) {
                    const item = tipappry[i]
                    if ('account' === (item.path)) {
                        userTip.account = item.msg
                    } else {
                        userTip.password = item.msg
                    }
                }
                return
            }
            // 保存数据
            localStorage.setItem('userinfo', JSON.stringify(response.data.data.sysuser))
            localStorage.setItem('token', response.data.data.token)
            ElMessage({
                message: '登录成功',
                grouping: true,
                type: 'success',
            })
            router.push('/mycenter')
        },
        (err) => {
            ElMessage.error(err)
        }).finally(() => {
            loading.value = false
        })
}
// -----------页面方法-----------
const router = useRouter()
function goRegister() {
    router.push('/register')
}
function forgetPassword() {

}
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
</style>