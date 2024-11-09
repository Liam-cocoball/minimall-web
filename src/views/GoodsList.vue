<template>
  <ion-card v-if="loading" class="loading">
    数据加载中
  </ion-card>
  <ion-card>
    <ion-card-header class="header">
      <ion-card-subtitle>
        <span> {{ goodsList.name }}</span>
      </ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <div class="goods" @click="goodsDetails(goods.id)" v-for="(goods, index) in goodsList.goodsAll" :key="index">
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
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle } from '@ionic/vue';

// import { logoApple } from 'ionicons/icons';
import { onMounted, ref,watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'

import axios from 'axios'
const loading = ref(true)
const router = useRouter()
const route = useRoute();

const goodsList = ref({
  id: 0,
  name: '',
  title: '',
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
}
)

function fetchGoodsData() {
  const { id } = route.params;
  axios({
    method: 'post',
    url: '/api/v1/goodsTypeByGoods',
    data: {
      id
    }
  })
    .then(function (response) {
      goodsList.value = response.data.data
      loading.value = false
    },
      (err) => {
        alert(err)
      }
    )
}

onMounted(() => {
  fetchGoodsData()
})

watch(() => route.params.id, () => {  
  console.log('111') 
  fetchGoodsData();  
});  

function goodsDetails(goodsid: number) {
  router.push({
    path: `/goodsDetails/${goodsid}`
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
  padding-top: 5px;
  box-shadow: 0px -1px 1px 0px rgba(173, 170, 170, 0.5);
}

.goods {
  display: flex;
  /* border-radius: 5px; */
  box-shadow: 0px 1px 0px 0px rgba(173, 170, 170, 0.5);
  align-items: center;

}

.item {
  padding: 5px 0px 5px 0px;
  font-size: 13px;
}

.goods:hover {
  cursor: pointer;
}

.left {
  width: 20%;
  margin-left: 5px

}

.left img {
  border-radius: 10px;
  width: 100px;
}

.right {
  width: 80%;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
  font-size: 15px;
}
</style>