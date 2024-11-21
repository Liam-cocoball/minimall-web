<template>
  <ion-card v-if="loading" class="loading" style="text-align: center;">
    数据加载中
  </ion-card>
  <ion-card v-else v-for="(item, index) in goodsType" :key="index">
    <ion-card-header class="header">
      <ion-card-subtitle>
        <span><ion-icon :icon="item.imagesAddress"></ion-icon> {{ item.name }}</span>
      </ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <div class="goods" @click="goodsDetails(goods.id)" v-for="(goods, i) in item.goodsAll" :key="i">
        <div class="item left">
          <img :src="goods.images[0]" :alt="goods.name">
        </div>
        <div class="item right">
          <div>{{ goods.name + " " + goods.title }}</div>
          <div class="targ">
            <span v-for="(targ, index) in goods.goodsTarg" :key="index">
              {{ targ.name }}
            </span>
          </div>
          <div class="money">￥{{ goods.goodsInfoAll[0].couponPrice }}</div>
        </div>
      </div>
    </ion-card-content>
  </ion-card>
</template>
<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonIcon } from '@ionic/vue';


import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import axios from 'axios'
const loading = ref(true)
const router = useRouter()
const goodsType = ref([{
  id: 0,
  name: '',
  title: '',
  imagesAddress: '',
  goodsAll: [
    {
      "goodsTarg": [
        {
          "id": 0,
          "name": ""
        }
      ],
      "goodsInfoAll": [
        {
          "id": 0,
          "goodsId": 0,
          "specsInfoIds": "",
          "state": 0,
          "inventory": 0,
          "price": 0,
          "couponPrice": 0
        }
      ],
      "id": 0,
      "name": "",
      "title": "",
      "images": [],
      "details": ""
    }]
}]
)


onMounted(() => {
  axios({
    method: 'get',
    url: '/api/v1/goodsList',
  })
    .then(function (response) {
      goodsType.value = response.data.data
      loading.value = false
    },
      (err) => {
        alert(err)
      }
    );
})

function goodsDetails(goodsid: number) {
  router.push({
    path: `/goods-details/${goodsid}`
  })

}

</script>

<style scoped>
ion-card-subtitle {
  font-size: 16px;
}

ion-card-header {
  padding: 16px 20px 16px 20px;
}

ion-card-content {
  padding: 5px;
  box-shadow: 0px -1px 1px 0px rgba(173, 170, 170, 0.5);
}

.goods {
  display: flex;
  /* border-radius: 5px; */
  box-shadow: 0px 1px 0px 0px rgba(173, 170, 170, 0.5);
  /* border-bottom: 1px solid rebeccapurple; */
  align-items: center;

}

.item {
  padding: 5px 0px 0px 0px;
  font-size: 13px;
}

.goods:hover {
  cursor: pointer;
}

.left {
  width: 20%;
  margin-left: 5px;

}

.left img {
  border-radius: 10px;
}

.right {
  width: 80%;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.right div:nth-child(1) {
  font-size: 16px;
}

.right div:nth-child(2) {
  font-size: 12px;
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
}



.money {
  color: red;
  font-size: 16px;
}
</style>