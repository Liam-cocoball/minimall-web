<template>
  <ion-card>
    <div class="help-content">
      <ion-card-header>
        <ion-card-title class="unifiedColor">选择你要查看的指南</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-accordion-group>
          <ion-accordion v-for="(a, i) in answera" :key="i">
            <div slot="header" class="header">
              <h2>{{ a.name }}</h2>
            </div>
            <div slot="content">
              <div class="content" v-for="(s, j) in a.answer" :key="j">
                <p @click="dialogVisibleFun(s)">{{ s.name }}</p>
              </div>

            </div>
          </ion-accordion>
        </ion-accordion-group>
      </ion-card-content>
    </div>
  </ion-card>
  <el-dialog v-model="dialog.dialogVisible" :title="dialog.dialogTitle" style="width: 95%;">
    <div v-html="dialog.answer.name"></div>
  </el-dialog>
</template>
<script setup lang="ts">
import { IonAccordion, IonAccordionGroup, IonCardHeader, IonCardContent, IonCard, IonCardTitle } from '@ionic/vue';
import axios from 'axios';
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue';

// 初始化对话框数据
const dialog = ref({
  dialogVisible: false,
  dialogTitle: '',
  answer: {
    id: 0,
    name: ''
  }
})
// 获取具体的对话框数据
async function dialogVisibleFun(content:any) {
  // 获取具体内容
  await axios({
    method: 'post',
    url: '/api/v1/getAnswer',
    data: {
      id:content.id
    }
  }).then(
    (response) => {
      if ((response.data.code === 500)) {
        ElMessage.error(response.data.message)
        return
      }
      // 保存数据
      console.log(response.data.data.data)
      dialog.value.answer = response.data.data.data
    },
    (err) => {
      ElMessage.error(err)
    })
  dialog.value.dialogVisible = true
  dialog.value.dialogTitle = content.name
}
// 是否加载
const loading = ref(false)

// 父级
const answera = ref([{
  id: 0,
  name: '',
  answer: [{
    id: 0,
    name: ''
  }]
}])
// 参数
const parm = ref({
  id: 0
})

// 挂载加载数据
onMounted(async () => {
  await axios({
    method: 'post',
    url: '/api/v1/getAnswer',
    data: parm.value
  }).then(
    (response) => {
      if ((response.data.code === 500)) {
        ElMessage.error(response.data.message)
        return
      }
      // 保存数据
      answera.value = response.data.data
    },
    (err) => {
      ElMessage.error(err)
    }).finally(() => {
      loading.value = false
    })
})

</script>

<style scoped>
ion-accordion-group {
  --ion-color-light: white;
}

.help-content {
  position: relative;
  max-width: 100%;
  background-color: white;
}

.header,
.content {
  margin: 5px 0px 5px 0px;
  padding: 5px 0px 5px 0px;
  box-shadow: 0px 1px 1px 0px rgba(173, 170, 170, 0.5);
}
</style>