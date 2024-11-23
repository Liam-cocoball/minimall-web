<template>
   <ion-card>
      <ion-card-header>
         <ion-card-title class="unifiedColor">查询订单</ion-card-title>
      </ion-card-header>

      <ion-card-content>
         <div>
            <ion-input :disabled="loding" ref="input" type="email" v-model="email" fill="solid" label="邮箱:"
               label-placement="floating" helper-text="请输入有效的邮箱↑"></ion-input>
         </div>
         <div>
            <ion-button :disabled="loding" expand="block" @click="getOrder">{{ buttext }}</ion-button>
            <ion-button :disabled="loding" size="small" @click="resetemail">重置</ion-button>
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
         <!-- <div class="ordertitle" @click="centerDialogVisible = true" v-for="(item, i) in 5" :key="i">
            <span>订单{{ item }}</span>
         </div> -->
         <div v-if="orderlist.length">
            <div class="ordergoods" @click="showDetails(item)" v-for="(item, i) in orderlist" :key="i">
               <div class="img">
                  <img :src="item.goods.images[0]" alt="图片">
               </div>
               <div class="info">
                  <div>{{ item.goods.name + '-' + item.goods.title }}</div>
                  <div>{{ item.sku.join(',') }}</div>
                  <div>
                  <span :class="item.state ===1?'orderstategreen':'orderstatered'">{{ orderstate(item.state) }}</span>
                  <span style="margin: 0px 5px 0px 10px;">x{{ item.count }}</span>
               </div>
               </div>
            </div>
         </div>
         <div v-else>
            暂无数据
         </div>
      </ion-card-content>
   </ion-card>

   <el-dialog v-model="centerDialogVisible" title="订单详情" width="100%" center>
      <div class="dialog">
         <div class="ordergoods">
            <div class="img">
               <img :src="cuurentOrder.goods.images[0]" :alt="cuurentOrder.goods.name">
            </div>
            <div class="info">
               <div>{{ cuurentOrder.goods.name + '-' + cuurentOrder.goods.title }}</div>
               <div>{{ cuurentOrder.sku.join(',') }}</div>
               <div>
                  <span :class="cuurentOrder.state ===1?'orderstategreen':'orderstatered'">{{ orderstate(cuurentOrder.state) }}</span>
                  <span style="margin: 0px 5px 0px 10px;">x{{ cuurentOrder.count }}</span>
               </div>
            </div>
         </div>
         <div class="orderinfo">
            <div>
               <div>支付方式</div>
               <div>{{ getPlayFunc(cuurentOrder.playFunc) }}</div>
            </div>
            <div>
               <div>实付款</div>
               <div>￥{{ cuurentOrder.playMoney }}</div>
            </div>
            <div>
               <div>订单编号</div>
               <div>{{ cuurentOrder.orderNumber }}</div>
            </div>
            <div>
               <div>支付时间</div>
               <div>{{ cuurentOrder.playTime }}</div>
            </div>
            <div>
               <div>下单时间</div>
               <div>{{ cuurentOrder.createTime }}</div>
            </div>
            <div>
               <div style="color: red;">有问题请联系售后客户！！！(wx:cocoball-vip)😊</div>
            </div>
         </div>
      </div>
   </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, IonButton } from '@ionic/vue';
import { ref, onBeforeMount } from 'vue'
import axios from 'axios'
import { format } from 'date-fns';
const email = ref('')
const centerDialogVisible = ref(false)
const orderlist = ref([
   {
      orderNumber: '',
      goodsId: '',
      goodsInfoId: 0,
      playMoney: 0,
      count: 0,
      playFunc: 0,
      state: 0,
      email: '',
      createTime: '',
      playTime: '',
      goods: {
         name: '',
         title: '',
         images: []
      },
      goodsinfo: {
         price: '',
         couponPrice: ''
      },
      sku: []
   }
])
const cuurentOrder = ref({
   orderNumber: '',
   goodsId: '',
   goodsInfoId: 0,
   playMoney: 0,
   count: 0,
   playFunc: 0,
   state: 0,
   email: '',
   createTime: '',
   playTime: '',
   goods: {
      name: '',
      title: '',
      images: []
   },
   goodsinfo: {
      price: '',
      couponPrice: ''
   },
   sku: []
})
const loding = ref(false)
const buttext = ref('查询')

onBeforeMount(() => {
   orderlist.value = []
})
function resetemail() {
   email.value = ''
   orderlist.value = []
}
async function getOrder() {
   if (email.value === '') {
      ElMessage.error('邮箱格式错误')
      return
   }
   loding.value = true
   buttext.value = '数据加载中...'
   await axios({
      method: 'get',
      url: '/api/v1/order/list?email=' + email.value
   }).then(
      (res) => {
         if (res.data.code === 501) {
            ElMessage.error(res.data.data[0].msg)
            return
         }
         if (res.data.code === 500) {
            ElMessage.error(res.data.msg)
            return
         }
         orderlist.value = res.data.data
         ElMessage.success('查询成功')
      },
      (err) => {
         ElMessage.error(err)
      }
   ).finally(() => {
      loding.value = false
      buttext.value = '查询'
   })
}
function showDetails(item: any) {
   centerDialogVisible.value = true
   cuurentOrder.value = item
   cuurentOrder.value.createTime = format(cuurentOrder.value.createTime, 'yyyy-MM-dd HH:mm:ss');
   cuurentOrder.value.playTime = format(cuurentOrder.value.playTime, 'yyyy-MM-dd HH:mm:ss');
}
function getPlayFunc(item: number): string {
   let playFunc = ''
   if (item === 1) {
      playFunc = '微信支付'
   } else if (item === 2) {
      playFunc = '支付宝支付'
   } else {
      playFunc = '余额支付'
   }
   return playFunc
}

function orderstate(state: number):string {
   return state === 1 ? '已付款' : '未付款'
}


</script>

<style scoped>
.dialog {
   color: black;
}

.ordertitle {
   margin: 10px 0px 10px 0px;
}

.ordergoods {
   display: flex;
   box-shadow: var(--el-box-shadow-lighter);
   padding: 10px;
   margin: 5px 0px 5px 0px;


}

.ordergoods .img {
   flex-grow: 1;
}

img {
   max-width: 70px;
}

.ordergoods .info {
   flex-grow: 10;
   margin-left: 10px;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
}

.ordergoods .info div:nth-child(3) {
   text-align: right;
}

.orderinfo div {
   display: flex;
   justify-content: space-between;
   margin: 5px 0px 5px 0px;
}

.orderstatered {
   color: red;
}

.orderstategreen {
   color: green;
}
</style>