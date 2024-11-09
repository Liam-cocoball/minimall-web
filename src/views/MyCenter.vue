<template>
    <ion-card>
        <ion-card-header>
            <div class="login-header">
                <ion-card-title class="unifiedColor">个人中心</ion-card-title>
            </div>
        </ion-card-header>
        <ion-card-content>
            <div class="userinfo">
                <img :src="userinfo.profile" alt="头像">
                <div>
                    <span>账号：{{ userinfo.account }}</span>
                    <span>邮箱：{{ userinfo.email }}</span>
                </div>
                <div>
                    <ion-button size="small" @click="updataaccount" style="margin-bottom: 5px;">修改资料</ion-button>
                    <ion-button size="small" @click="dialog = true" style="margin: 0;">修改密码</ion-button>
                </div>
            </div>
            <div class="userinfoOther">
                <div><span>余额：{{ userinfo.money }}￥</span></div>
                <div><span>等级：{{ userinfo.level }}</span></div>
                <div><span>电话：{{ userinfo.phone }}</span></div>
                <div><span>支付宝账号：{{ userinfo.zfbAccount }}</span></div>
                <div><span>支付宝名字：{{ userinfo.zfbName }}</span></div>
                <div><span>最后登录时间：{{ userinfo.lastTime }}</span></div>
            </div>
            <ion-button expand="block" @click="exit">退出</ion-button>
        </ion-card-content>
    </ion-card>

    <el-dialog v-model="dialog" style="width: 95%;background-color: white">
        <ion-card-header>
            <ion-card-title class="unifiedColor">修改密码</ion-card-title>
        </ion-card-header>
        <ion-list>
            <ion-item>
                <ion-input ref="input" type="password" v-model="userpwd.oldpassword" fill="solid" label="旧密码: "
                    label-placement="floating" placeholder="旧密码"></ion-input>
            </ion-item>
            <ion-item>
                <ion-input ref="input" type="password" v-model="userpwd.newpassword" fill="solid" label="新密码: "
                    label-placement="floating" placeholder="新密码"></ion-input>
            </ion-item>
            <ion-item>
                <ion-input ref="input" type="password" v-model="userpwd.oknewpassword" fill="solid" label="确认新密码: "
                    label-placement="floating" placeholder="确认新密码"></ion-input>
            </ion-item>
            <ion-button expand="block" @click="updatapwd" style="margin-top: 20px;">确定</ion-button>
        </ion-list>
    </el-dialog>

</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonInput, IonItem, IonList } from '@ionic/vue';
import { useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { format } from 'date-fns';
import axios from 'axios';


const dialog = ref(false)

const router = useRouter()

// 用户数据
let userinfo = {
    account: '',
    profile: '',
    money: 0,
    phone: '',
    email: '',
    lastTime: '',
    level: 1,
    zfbAccount: '',
    zfbName: ''
}
onMounted(() => {
    const userinfostr = localStorage.getItem('userinfo')
    if (userinfostr === null) {
        router.push('/login')
        return
    }
    userinfo = reactive(JSON.parse(userinfostr))
    userinfo.lastTime = format(userinfo.lastTime, 'yyyy-MM-dd HH:mm:ss');
})
// 修改密码数据
const userpwd = reactive({
    oldpassword: 'qwertyuiop',
    newpassword: 'qwertyuiop',
    oknewpassword: 'qwertyuiop',
})
// 修改密码
async function updatapwd() {
    if (userpwd.oldpassword === '' || userpwd.newpassword === '' ||
        userpwd.oknewpassword === '' ||
        userpwd.newpassword !== userpwd.oknewpassword) {

        ElMessage.error('请输入合法密码')
        return
    }
    const token = localStorage.getItem('token')
    await axios({
        method: 'post',
        url: '/api/v1/updatepwd',
        headers:{
            Authorization:token
        },
        data: userpwd
    }).then(
        (response) => {
            if (response.data.code === 500) {
                ElMessage.error(response.data.message)
                return
            }
            ElMessage.success(response.data.message)
            dialog.value = false
        },
        (err) => {
            ElMessage.error(err)
        })
}

// 修改账户资料
function updataaccount() {
    ElMessage.success('待开发')
}

// 退出登录
function exit() {
    localStorage.removeItem('userinfo')
    localStorage.removeItem('token')
    router.push('/login')
    ElMessage({
        message: '退出成功',
        grouping: true,
        type: 'success',
    })
}



</script>

<style scoped>
.userinfo {
    display: flex;
    align-items: flex-end;
    border-bottom: 1px solid #6815ec;
    padding-bottom: 10px;
    margin-top: 10px;
}

.userinfo img {
    width: 60px;
    border-radius: 50px;
    border: 1px solid #6815ec;
}

.userinfo div {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

}

.userinfo div span {
    margin: 10px 0px 0px 0px;
}

.userinfoOther {
    margin-top: 20px;
}

.userinfoOther div {
    margin: 10px 0px 10px 0px;
}
</style>