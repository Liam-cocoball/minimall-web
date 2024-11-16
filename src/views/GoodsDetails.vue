<template>
    <ion-card v-if="loading" class="loading">
        数据加载中
    </ion-card>
    <div v-else>
        <ion-card>
            <ion-card-header>
                <!-- <img :src="goodsDetails.images[0]" :alt="goodsDetails.name"> -->
                <!-- <carousel arrows :dots="false">
                    <template #prevArrow>
                        <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                            <left-circle-outlined />
                        </div>
                    </template>
<template #nextArrow>
                        <div class="custom-slick-arrow" style="right: 10px">
                            <right-circle-outlined />
                        </div>
                    </template>
<div v-for="(item, i) in goodsDetails.images" :key="i">
    <div class="carousel-img">
        <img :src="item" :alt="goodsDetails.name">
    </div>
</div>
</carousel> -->
                <el-carousel height="150px">
                    <el-carousel-item v-for="(item, i) in goodsDetails.images" :key="i">
                        <div class="small justify-center" text="2xl" style="text-align: center;">
                            <img :src="item" :alt="goodsDetails.name">
                        </div>
                    </el-carousel-item>
                </el-carousel>

            </ion-card-header>
            <ion-card-content class="goods">
                <div class="specialization">
                    <div class="item title">
                        <span>{{ goodsDetails.name }}</span>
                        <span>{{ goodsDetails.title }}</span>
                    </div>
                    <div class="item targ">
                        <span v-for="(t, i) in goodsDetails.goodsTarg" :key="i">{{ t.name }}</span>
                    </div>
                    <div class="item goodsNumber">
                        <span>购买数量：</span>
                        <div class="mynumberinput">
                            <div class="ionicon ionicon-left" @click="operateNumber(0)">
                                <b>←</b>
                            </div>
                            <input disabled
                                style="width: 60px;height: 100%; border-radius: 0px;border: 0px;text-align: center;"
                                type="number" v-model="goodsNumber">
                            <div class="ionicon ionicon-right" @click="operateNumber(1)">
                                <b>→</b>
                            </div>
                        </div>
                        <div style="margin-left: 20px;">
                            <span> 库存：{{ currentGoods.inventory }}</span>
                        </div>
                    </div>
                    <!-- 商品规格 -->
                    <div class="item">
                        <div class="special" v-for="(specs, i) in goodsDetails.specsAll" :key="i">
                            <div class="title"><span>{{ specs.name }}</span></div>
                            <ion-radio-group :value="currentGoods.goodsSpecsInfoAll[i].value">
                                <ion-radio v-for="(specsinfo, i) in specs.goodsSpecsInfoAll" :key="i"
                                    :value="specsinfo.value" @click="getSku(specsinfo)">{{ specsinfo.value
                                    }}</ion-radio>
                            </ion-radio-group>
                        </div>

                    </div>
                    <div class="item payopt">
                        <span class="title">选择支付方式</span>
                        <ion-radio-group v-model="currentPlay">
                            <ion-radio value="wx" class="payFunction">
                                <!-- <ion-icon :icon="logoWechat"></ion-icon> -->
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-weixin"></use>
                                </svg>
                                <span>微信</span>
                            </ion-radio>
                            <ion-radio value="zfb" class="payFunction">
                                <!-- <ion-icon :icon="logoAlipay"></ion-icon> -->
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-zhifubao"></use>
                                </svg>
                                <span>支付宝</span>
                            </ion-radio>
                            <ion-radio value="ye" class="payFunction">
                                <!-- <ion-icon :icon="walletOutline"></ion-icon> -->
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-yibaoyue"></use>
                                </svg>
                                <span>余额 {{ userinfo.money }}</span></ion-radio>
                        </ion-radio-group>
                    </div>
                    <div class="item">
                        <div class="pricetip">现在购买节省<b style="margin-left: 3px;color: red">{{
                            (currentGoods.price - currentGoods.couponPrice).toFixed(2) }}</b></div>
                        <div class="price">
                            <span>
                                ￥{{ currentGoods.couponPrice }}
                            </span>
                            <span>
                                ￥{{ currentGoods.price }}
                            </span>
                        </div>
                        <div class="emailoderinput">
                            <ion-input type="email" fill="solid" v-model="emailorder" label="邮箱:"
                                label-placement="floating" helper-text="请输入有效邮箱↑">
                            </ion-input>
                            <p>游客购买后，查询订单信息需要用到 电子邮箱 。登录用户无需填写此项</p>
                        </div>
                        <ion-button expand="block" size="small" @click="play">
                            <span>立即购买</span>
                            <!-- <ion-icon slot="icon-only" :ios="logoApple" :md="settingsSharp"></ion-icon> -->
                        </ion-button>
                        <div class="tip" style="text-align: center;margin-top: 10px;">
                            <span>遇到任何问题，请及时联系网站客服：cocoball</span>
                        </div>
                    </div>
                </div>
            </ion-card-content>
        </ion-card>
        <ion-card>
            <ion-card-header>
                <div class="goodsinfo">商品介绍（注意事项）</div>
            </ion-card-header>
            <ion-card-content>
                <div v-html="goodsDetails.details">
                </div>
            </ion-card-content>
        </ion-card>
    </div>

</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { IonCard, IonCardContent, IonCardHeader, IonRadio, IonRadioGroup, IonButton, IonInput } from '@ionic/vue';
import axios from 'axios';
import { onBeforeMount, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute();
// 是否加载
const loading = ref(false);
// 购买数量
const goodsNumber = ref(1)
// 商品详情
const goodsDetails = ref({
    specsAll: [
        {
            "id": 0,
            "name": "",
            "order": 0,
            goodsSpecsInfoAll: [
                {
                    "id": 0,
                    "goodsSpecs": 0,
                    "value": "",
                    "order": 1
                }
            ]
        },
    ],
    goodsSpecsInfoAll: [
        {
            "id": 0,
            "goodsSpecs": 0,
            "value": "",
            "order": 1
        }
    ],
    goodsTarg: [
        {
            "id": 0,
            "name": ""
        }
    ],
    goodsInfoAll: [
        {
            "id": 0,
            "goodsId": 0,
            "specsInfoIds": "",
            "state": 0,
            "inventory": 0,
            "price": 0,
            "couponPrice": 0,
            "recommend": 0,
            goodsSpecsInfoAll: [
                {
                    "id": 0,
                    "goodsSpecs": 0,
                    "value": "",
                    "order": 1
                }
            ]
        }
    ],
    id: 0,
    name: "",
    title: "",
    images: [],
    targ: [],
    goodsTypeId: 1,
    specsIds: [],
    details: ""
})
// 当前选择的商品
let currentGoods = reactive({
    id: 0,
    goodsId: 0,
    specsInfoIds: "",
    state: 0,
    inventory: 0,
    price: 0,
    couponPrice: 0,
    recommend: 0,
    goodsSpecsInfoAll: [
        {
            id: 0,
            goodsSpecs: 0,
            value: "",
            order: 1
        }
    ]
})
const emailorder = ref('')
const currentPlay = ref('wx')

// 得到当前用户选择的sku并且修改sku
async function getSku(sku: any) {
    for (let i = 0; i < currentGoods.goodsSpecsInfoAll.length; i++) {
        const e1 = currentGoods.goodsSpecsInfoAll[i]
        if (e1.goodsSpecs === sku.goodsSpecs) {
            currentGoods.goodsSpecsInfoAll[i].id = sku.id
            currentGoods.goodsSpecsInfoAll[i].goodsSpecs = sku.goodsSpecs
            currentGoods.goodsSpecsInfoAll[i].order = sku.order
            currentGoods.goodsSpecsInfoAll[i].value = sku.value
        }
    }
    await axios({
        method: 'post',
        url: '/api/v1/getGoodsSku',
        data: {
            goods: currentGoods
        }
    })
        .then(function (res) {
            Object.assign(currentGoods, res.data.data)
        },
            (err) => {
                alert(err)
            }
        );
}

// 用户数据
const userinfo = ref({
    money: 0
})
// 加载数据
onBeforeMount(async () => {
    const { id } = route.params
    loading.value = true
    await axios({
        method: 'post',
        url: '/api/v1/goodsDetails',
        data: {
            id,
        }
    }).then(function (response) {
        goodsDetails.value = response.data.data
        currentGoods = goodsDetails.value.goodsInfoAll[0]
        loading.value = false
        const userinfostr = localStorage.getItem('userinfo')
        if (userinfostr === null) {
            return
        }
        userinfo.value = reactive(JSON.parse(userinfostr))
    },
        (err) => {
            ElMessage.error(err)
        }
    );

})
// 支付
async function play() {
    console.log(currentGoods)
    if (currentGoods.inventory <= 0) {
        ElMessage.warning('商品太火爆了,暂时无法购买')
        return
    }
    if (currentPlay.value === '') {
        ElMessage.error('请选择支付方式')
        return
    }
    if (currentPlay.value === 'zfb' || currentPlay.value === 'ye') {
        ElMessage.success('目前仅支持微信支付')
        return
    }
    const data = {
        email: emailorder.value,
        goodsId: currentGoods.id,
        playFunc: 1,
        count: goodsNumber.value
    }
    await axios({
        method: 'post',
        url: '/api/v1/createOrder',
        data
    }).then(
        (res) => {
            console.log(res.data)
            if (res.data.code === 200) {
                router.push({ path: `/playDetails/${res.data.data.orderNumber}` })
            } else {
                ElMessage.error(res.data)
            }
        },
        (err) => {
            console.log(err)
        }
    )
}

// 判断购买数量不能大于库存和最小值
function operateNumber(operate: number) {
    if (operate) {
        if (goodsNumber.value >= currentGoods.inventory) {
            ElMessage.warning('购买数量不能大于库存')
        } else {
            goodsNumber.value++
        }
    } else {
        if (goodsNumber.value <= 1) {
            ElMessage.warning('购买数量不能小于1')
        } else {
            goodsNumber.value--
        }
    }
}





</script>


<style scoped>
img {
    max-width: 100%;
    height: 160px;
    border-radius: 10px;
}

.carousel-img {
    display: flex;
    justify-content: center;
}

ion-card-header {
    padding: 0;
    border-bottom: 1px solid #6815ec;
}

ion-card-content {
    padding-top: 10px;
}

.item {
    margin-bottom: 10px;
}

.title {
    font-size: 16px;
}

.targ {
    display: flex;
    justify-content: space-between;


}

.targ span {
    color: #6815ec;
    border: 1px solid #6815ec;
    border-radius: 3px;
    padding: 0px 10px 0px 10px;
    font-size: 12px;
}

.goodsNumber {
    padding: 10px 0px 10px 0px;
    border-bottom: 1px solid #6815ec;
}

.goodsNumber,
.mynumberinput {
    display: flex;
    align-items: center;
}

.mynumberinput {
    border: 1px solid #ddd;
    height: 25px;
    line-height: 25px;
    text-align: center;
    border-radius: 5px;
}

.ionicon {
    background-color: #ddd;
    width: 30px;
}

.ionicon-left {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

.ionicon-right {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

.ionicon:hover {
    cursor: pointer;
}

.goodsinfo {
    padding: 10px 0px 10px 20px;
    font-size: 20px;
    border-bottom: 1px solid #6815ec;
}

.payopt {
    border-bottom: 1px solid #6815ec;
}

/* 规格样式 */
ion-radio-group {
    display: flex;
    flex-wrap: wrap;
}

ion-radio {
    --border-radius: 4px;
    --inner-border-radius: 4px;
    --color: #ddd;
    --color-checked: #6815ec;
    /* border: 1px solid #6815ec; */
    background-color: #ddd;
    border-radius: 5px;
    margin: 10px 10px 10px 0px;
    padding: 5px;
}

ion-radio.ios::part(container) {
    width: 20px;
    height: 20px;
    border: 2px solid #6815ec;
    border-radius: 4px;
}

.radio-checked.ios::part(container) {
    border-color: #6815ec;
}

.pricetip {
    font-size: 10px;
    margin: 10px 10px 10px 0px;
}

.price span:nth-child(1) {
    color: red;
    font-size: 20px;
}

.price span:nth-child(2) {
    margin-left: 30px;
    text-decoration: line-through
}

.payFunction {
    display: flex;
    align-items: center;
}

/* For demo */
:deep(.slick-slide) {
    text-align: center;
    height: 160px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
}

:deep(.slick-arrow.custom-slick-arrow) {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #6815ec;
    /* background-color: rgba(31, 45, 61, 0.11); */
    transition: ease all 0.3s;
    opacity: 0.3;
    z-index: 1;
}

:deep(.slick-arrow.custom-slick-arrow:before) {
    display: none;
}

:deep(.slick-arrow.custom-slick-arrow:hover) {
    color: #6815ec;
    opacity: 0.5;
}

:deep(.slick-slide h3) {
    color: #fff;
}

:deep(.slick-slide) {
    background: none;
}

ion-input {
    --ion-color-step-50: #f2f2f2;
}

.emailoderinput {
    border-top: 1px solid #6815ec;
}
</style>