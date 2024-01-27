<script setup lang="ts">
import CUpload from "@/components/commonInput/Cupload";
import {reactive,onMounted} from "vue";
import {useSport} from "@/store";
import {useProxy} from "@/hooks/useProxy";
const props=defineProps(['computerAdGoalUrl','computerAdPictureUrl','phoneAdGoalUrl','phoneAdPictureUrl'])
const url=''
const form=reactive<{
  computerAdGoalUrl:string,
  computerAdPictureUrl:string,
  phoneAdGoalUrl:string,
  phoneAdPictureUrl:string,
}>({
  phoneAdGoalUrl: "", computerAdGoalUrl: "", phoneAdPictureUrl: "", computerAdPictureUrl: ""
})
const {proxy,loading}=useProxy()
const Submit=()=>useSport().setSetting(form,()=>{
  loading.value=true
}).then(v=>{
  proxy?.$message.success(v)
}).catch(r=>{
  proxy?.$message.error('操作失败')
}).finally(()=>loading.value=false)
onMounted(()=>Object.assign(form,props))
const Reset=()=>{
  Object.assign(form,{
    phoneAdGoalUrl: "", computerAdGoalUrl: "", phoneAdPictureUrl: "", computerAdPictureUrl: ""
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
      <a-input v-model="form.computerAdGoalUrl" placeholder="Search enter" size="large"/>
    </p>
    <c-upload :default-img="[{
                        uid:String(Date.now()),
                        name:'phoneAdPictureUrl',
                        url:form.phoneAdPictureUrl
                    }]" tit="广告图片" url="phoneAdPictureUrl" />
    <a-divider orientation="left">电脑广告设置</a-divider>
    <p>
      <span>点击目标地址</span>
      <a-input v-model="form.phoneAdGoalUrl" placeholder="Search enter" size="large"/>
    </p>
    <c-upload :default-img="[{
                        uid:String(Date.now()),
                        name:'computerAdGoalUrl',
                        url:form.computerAdGoalUrl
                    }]" tit="广告图片" url="computerAdGoalUrl"/>
    <div style="margin-top: 20px">
      <a-button @click="Submit" type="primary" :loading="loading">Submit</a-button>&nbsp;&nbsp;
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