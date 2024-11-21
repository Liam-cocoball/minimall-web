<template>

  <ion-card v-if="loading" class="loading"  style="text-align: center;">
    数据加载中
  </ion-card>
  <ion-card v-else>
    <ion-card-content>
      <div class="banner">
        <div class="item item1" v-for="item in goodsType" :key="item.id" @click="goGoodsList(item.id)">
          <div>
            <ion-icon style="font-size: 38px;color: #b0a4e3;" :icon="item.imagesAddress"></ion-icon>
          </div>
          <span style="font-size: 12px;">{{ item.name }}</span>
        </div>
      </div>
    </ion-card-content>
  </ion-card>

  <router-view />


</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonIcon } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import axios from 'axios'
import { RouterView, useRouter } from 'vue-router'
const router = useRouter()
const goodsType = ref([{
  id: 0,
  name: '',
  imagesAddress: ''
}])
const loading = ref(true);
router.push('/home-goods')
onMounted(async () => {
  await axios({
    method: 'get',
    url: '/api/v1/goodsTypeList',
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

function goGoodsList(id: number) {
  router.push(`/home/goods-list/${id}`)
}

</script>

<style scoped>
/* img{
  border: 1px solid #6815ec;
  border-radius: 50%;
} */
.banner {
  display: flex;
  flex-wrap: wrap;
}

.item {
  text-align: center;
  width: 20%;
}

.item:hover {
  cursor: pointer;
}

span {
  font-size: 12px;
}

ion-card {
  margin-top: 12px;
}

.item1 {
  /* border: 1px solid red; */
  cursor: pointer;
  padding: 0px 5px 0px 5px;
}
</style>