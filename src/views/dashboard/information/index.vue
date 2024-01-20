<script setup lang="ts">
import {ref} from "vue";
import BaseSetting from "@/views/dashboard/information/components/base/baseSetting";
import Advertise from "@/views/dashboard/information/components/advertise/advertise.vue";
import Float from "@/views/dashboard/information/components/float/float";
import DisplayImg from "@/views/dashboard/information/components/display/displayImg.vue";
const showPanel = ref<string>('advertise')
const btnData = ['base', 'advertise', 'float']
</script>
<script lang="ts">
export default {
  name: 'information', // If you want the include property of keep-alive to take effect, you must name the component
};
</script>
<template>
  <div class="container">
    <div class="top">
      <a-button-group>
        <a-button size="large" @click="()=>showPanel=k" :type="k===showPanel?'primary':'text'"
                  v-for="k in btnData" :key="k">{{ $t('menu.information.'+k) }}
        </a-button>
      </a-button-group>
    </div>
    <div class="content">
      <base-setting v-if="showPanel==='base'"/>
      <advertise v-else-if="showPanel==='advertise'"/>
      <float v-else/>
      <display-img v-if="showPanel!=='advertise'"/>
    </div>
  </div>
</template>

<style scoped lang="less">
.container{
  box-sizing: border-box;
  padding: 40px 50px;
  width: 100%;
  height: 100%;
  .content{
    width: 100%;
    height: 100%;
    display: grid;
    grid-column-gap: 40px;
    grid-template-columns: 1fr 350px;
    //width: 100%;
    //height: 100%;
    //background-color: #fff;
  }
}
</style>