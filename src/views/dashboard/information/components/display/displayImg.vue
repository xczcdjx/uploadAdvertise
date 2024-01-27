<script lang="ts">
import {Vue, Component, toNative, Setup} from 'vue-facing-decorator';
import dis from '@/assets/images/display.png'
import {type Info} from "@/store/modules/info";
import {useSport} from "@/store";
import {storeToRefs} from "pinia";
@Component({
  name:'displayImg'
})
export default class displayImg extends Vue {
  @Setup(()=>{
    const {info}=storeToRefs(useSport())
    return info
  })
  info!:Info
  get b1(){
    return this.info.lineColour
  }
  get b2(){
    return this.info.facebookColour
  }
  getImage(){
    return dis
  }
}
</script>

<template>
<div class="displayImage">
  <img :src="getImage()"/>
  <div class="logo">
    <a-avatar ><img :src="'data:'+info.logoUrl"/> </a-avatar>
    <span>{{info.websiteName}}</span>
  </div>
  <div class="floatBox" :style="{backgroundColor:info.lineColour}">
    <icon-face-smile-fill />
    <span>{{info.lineText}}</span>
  </div>
  <div class="floatBox2" :style="{backgroundColor:info.facebookColour}">
    <icon-faceBook-circle-fill />
<span>{{ info.facebookText}}</span>
  </div>
</div>
</template>

<style scoped lang="less">
.displayImage{
  margin-top: 30px;
  position: relative;
  >img{
    width: 100%;
    position: absolute;
  }
  .logo{
    position: absolute;
    display: flex;
    top: 40px;
    left: 5px;
    >span{
      align-self: flex-end;
      margin-left: 5px;
      font-size: 23px;
      color: white;
    }
  }
  .floatBox{
    position: absolute;
    right: 10px;
    width: 100px;
    top: 500px;
    height: 40px;
    border-radius: 5px;
    color: white;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    >span{margin-left: 5px}
  }
  .floatBox2{
    .floatBox();
    top: 555px;
  }
}
</style>