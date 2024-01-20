<script lang="ts">
import {Vue, Component, toNative} from 'vue-facing-decorator';
import dis from '@/assets/images/display.png'
@Component({

})
export default class displayImg extends Vue {
  getImage(){
    return dis
  }
}
</script>

<template>
<div class="displayImage">
  <img :src="getImage()"/>
</div>
</template>

<style scoped lang="less">
.displayImage{
  margin-top: 30px;
  >img{
    width: 100%;
  }
}
</style>