<template>
    <ion-card>
        <div>
            <div class="header">

                <h2> <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-weixin"></use>
                    </svg>
                    微信扫码支付
                </h2>
            </div>
            <div class="content">
                <div>
                    <span>￥{{ orderdata.playMoney }}</span>
                </div>
                <div>
                    <img :src="orderdata.lantuData.data.QRcode_url" alt="付款二维码" style="width: 230px;height: 230px;">
                    <div><span style="color: red;">有效期为15分钟,到期后将自动释放</span></div>
                    <div :class="ordertip"><span>当前状态：{{ orderstate }}</span></div>
                </div>
            </div>

            <ion-accordion-group>
                <ion-accordion value="first">
                    <ion-item slot="header" color="light">
                        <ion-label>订单详情</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                        <div class="goodsinfo">
                            <div>
                                <span>商品</span>
                                <span>{{ orderdata.goods.title }}</span>
                            </div>
                            <div>
                                <span>订单号</span>
                                <span>{{ orderdata.orderNumber }}</span>
                            </div>
                            <div>
                                <span>下单时间</span>
                                <span>{{ orderdata.createTime }}</span>
                            </div>
                        </div>

                    </div>
                </ion-accordion>
            </ion-accordion-group>

            <div class="tip">
                <div>
                    <span>方式一: </span>
                    <span>请使用微信扫一扫完成支付</span>
                </div>
                <div>
                    <span>方式二: </span>
                    <span> 长按二维码,识别二维码完成支付</span>
                </div>
                <div>
                    <span>方式三: </span>
                    <span> 保存二维码图片,用微信识别完成支付</span>
                </div>
                <div>
                    <span>方式四: </span>
                    <span>在微信中点击此链接完成支付</span>
                </div>
                <div style="margin-top: 30px;color: red;">
                    <span>tip: 付款成功后,系统将会在15分钟内把相关资料发送至您邮箱,请注意查收</span>
                </div>
            </div>
        </div>
    </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/vue';
import axios from 'axios';
import { onBeforeMount, onUnmounted, ref, computed } from 'vue';
import { format } from 'date-fns';
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute();
const orderdata = ref({
    orderNumber: "",
    goodsId: "",
    playMoney: "",
    count: 0,
    playFunc: 0,
    state: 0,
    userId: "",
    email: "",
    createTime: "",
    updateTime: "",
    lantuData: {
        code: 0,
        data: {
            order_url: "",
            QRcode_url: ""
        },
        msg: "",
        request_id: ""
    },
    goods: {
        name: '',
        title: ''
    }
})
const ordertip = ref('ordertipred')

let timerid: string | number | NodeJS.Timeout | null | undefined = null
onUnmounted(() => {
    if (timerid !== null) {
        clearInterval(timerid)
    }
})

const orderstate = computed(() => {
    return orderdata.value.state === 1 ? '支付成功,3s后回到首页' : '待付款'
})

onBeforeMount(async () => {
    const { orderNumber } = route.params
    // 订单号不对，返回首页
    if (orderNumber === undefined || orderNumber === null || orderNumber === '') {
        router.push('/home-goods')
    }
    // 查询订单
    getOrder(orderNumber)
    timerid = setInterval(async () => {
        getOrder(orderNumber)
    }, 5000)

})

async function getOrder(orderNumber: any) {
    await axios({
        method: 'get',
        url: '/api/v1/order/page?orderNumber=' + orderNumber
    }).then(
        (res) => {
            if(res.data.code === 500){
                ElMessage.error(res.data.msg)
                router.push('/home-goods')
                return
            }
            if (orderdata.value.state !== res.data.data.state) {
                orderdata.value = res.data.data
                orderdata.value.createTime = format(orderdata.value.createTime, 'yyyy-MM-dd HH:mm:ss');
                if (orderdata.value.state === 1) {
                    ElMessage.success('付款成功')
                    ordertip.value = 'ordertipgreen'
                    setTimeout(() => {
                        router.push('/home-goods')
                    }, 3000)
                }
            }
        },
        (err) => {
            ElMessage.error(err)
            router.push('/home-goods')
        }
    )
}


</script>

<style scoped>
.ordertipred {
    color: red
}

.ordertipgreen {
    color: green
}

ion-card {
    color: black;

}

.header,
.content {
    margin-top: 15px;
    margin-bottom: 15px;
}

.header,
.content {
    text-align: center;
}

.content div:nth-child(1) span {
    font-size: 35px;
    font-weight: bold;
}

.goodsinfo,
.tip {
    display: flex;
    flex-direction: column;
    font-size: 15px;
}

.goodsinfo div {
    display: flex;
    justify-content: space-around;

}

.tip {
    border-top: 2px solid #f4f5f8;
    padding: 0px 16px 16px 16px;
}

.tip div {
    display: flex;
    /* justify-content: space-around; */
}


.goodsinfo div,
.tip div {
    margin: 5px 0px 5px 0px;
}



.goodsinfo div span {
    margin-left: 30px;
    margin-right: 30px;
}
</style>