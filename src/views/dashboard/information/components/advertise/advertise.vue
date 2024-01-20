<script setup lang="ts">
import CUpload from "@/components/commonInput/Cupload";
const url=''
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
      <a-input placeholder="Search enter" size="large"/>
    </p>
    <c-upload tit="广告图片" :url="url"/>
    <a-divider orientation="left">电脑广告设置</a-divider>
    <p>
      <span>点击目标地址</span>
      <a-input placeholder="Search enter" size="large"/>
    </p>
    <c-upload tit="广告图片" :url="url"/>
    <div style="margin-top: 20px">
      <a-button type="primary">Submit</a-button>&nbsp;&nbsp;
      <a-button>Reset</a-button>
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