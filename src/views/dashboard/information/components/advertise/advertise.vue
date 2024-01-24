<script setup lang="ts">
import CUpload from "@/components/commonInput/Cupload";
import {reactive} from "vue";
const url=''
const form=reactive<{
  phoneTarget:string,
  phoneImg:string,
  computedTarget:string,
  computedImg:string,
}>({
  computedTarget: "", phoneTarget: "", computedImg: "", phoneImg: ""
})
const Submit=()=>{
  console.log(form)
}
const Reset=()=>{
  Object.assign(form,{
    computedTarget: "", phoneTarget: "", computedImg: "", phoneImg: ""
  })
}
</script>
<script lang="ts">
export default {
  name: 'advertise', // If you want the include property of keep-alive to take effect, you must name the component
};
</script>
<template>
  <div class="advertise">
    <a-divider orientation="left">手机广告设置</a-divider>
    <p>
      <span>点击目标地址</span>
      <a-input v-model="form.phoneImg" placeholder="Search enter" size="large"/>
    </p>
    <c-upload tit="广告图片" :url="url"/>
    <a-divider orientation="left">电脑广告设置</a-divider>
    <p>
      <span>点击目标地址</span>
      <a-input v-model="form.computedImg" placeholder="Search enter" size="large"/>
    </p>
    <c-upload tit="广告图片" :url="url"/>
    <div style="margin-top: 20px">
      <a-button @click="Submit" type="primary">Submit</a-button>&nbsp;&nbsp;
      <a-button @click="Reset">Reset</a-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.advertise {
  .arco-divider{
    margin-top: 30px;
  }
  p {
    margin-top: 30px;
    .arco-input-wrapper {
      margin-top: 10px;
    }
    >span{
      color: var(--color-text-1);
    }
  }
}
</style>