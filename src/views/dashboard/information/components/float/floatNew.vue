<script setup lang="ts">
import CUpload from "@/components/commonInput/Cupload";
import {onMounted, reactive, ref} from "vue";
import {useSport} from "@/store";
import {useProxy} from "@/hooks/useProxy";

const props = defineProps(['info'])
const {proxy, loading} = useProxy()
const templates: string[] =
    ['red', 'green', 'blue', 'white', 'yellow', 'orange', 'black', 'brown', 'skyblue', 'pink']
const form = reactive({
  template: '',
  windowPictureUrl: '',
  windowUrl: '',
  lineStatus: false,
  lineText: '',
  lineGoalUrl: '',
  lineColour: '#000000',
  facebookStatus: false,
  faceText: '',
  facebookGoalUrl: '',
  facebookColour: '#000000',
})
const changeTem = (v: string) => form.template = v
const Submit = () => useSport().setSetting(form as any, () => {
  loading.value = true
}).then(v => {
  proxy?.$message.success(v)
}).catch(r => {
  proxy?.$message.error('操作失败')
}).finally(() => loading.value = false)
onMounted(() => {
  for (const key in form) {
    form[key] = props.info[key]
  }
})
const Reset = () => {
  Object.assign(form, {
    template: '',
    windowPictureUrl: '',
    windowUrl: '',
    lineStatus: false,
    lineText: '',
    lineGoalUrl: '',
    lineColour: '#000000',
    facebookStatus: false,
    faceText: '',
    facebookGoalUrl: '',
    facebookColour: '#000000',
  })
}
</script>
<script lang="ts">
export default {
  name: 'floatNew'
}
</script>
<template>
  <div class='float'>
    <div class='top'>
      <p>模板选择</p>
      <ul>
        <li :key="it" :class="form.template===it?'act':''" v-for="it in templates" @click="changeTem(it)"
            :style="{backgroundColor:it}"></li>
      </ul>
    </div>
    <c-upload
        :default-img="[{
                        uid:String(Date.now()),
                        name:'windowPictureUrl',
                        url:form.windowPictureUrl
                    }]"
        tit="自定图片" url="windowPictureUrl"/>
    <p>
      <span>浮窗链接</span>
      <a-input v-model="form.windowUrl" placeholder="Search enter" size="large"/>
    </p>
    <a-divider orientation="left">line设置</a-divider>
    <p><span>是否启用</span>&nbsp;&nbsp;<a-switch :checked-value="1" :unchecked-value="0" v-model="form.lineStatus"/>
    </p>
    <p>
      <span>文字</span>
      <a-input v-model="form.lineText" placeholder="Search enter" size="large"/>
    </p>
    <p>
      <span>点击目标地址</span>
      <a-input v-model="form.lineGoalUrl" placeholder="Search enter" size="large"/>
    </p>
    <p><span>按钮颜色</span>&nbsp;&nbsp;<input v-model="form.lineColour" type='color'/></p>
    <a-divider orientation="left">facebook设置</a-divider>
    <p><span>是否启用</span>&nbsp;&nbsp;<a-switch :checked-value="1" :unchecked-value="0"
                                                  v-model="form.facebookStatus"/>
    </p>
    <p>
      <span>文字</span>
      <a-input v-model="form.faceText" placeholder="Search enter" size="large"/>
    </p>
    <p>
      <span>点击目标地址</span>
      <a-input v-model="form.facebookGoalUrl" placeholder="Search enter" size="large"/>
    </p>
    <p><span>按钮颜色</span>&nbsp;&nbsp;<input v-model="form.facebookColour" type='color'/></p>
    <div style="margin-top: 20px">
      <a-button type="primary" @click="Submit" :loading="loading">Submit</a-button>&nbsp;&nbsp;
      <a-button @click="Reset">Reset</a-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.float {
  p {
    margin-top: 30px;

    .arco-input-wrapper {
      margin-top: 10px;
    }

    > span {
      color: var(--color-text-1);
    }
  }

  .top {
    > ul {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      place-items: center;
      gap: 10px;

      > li {
        width: 70px;
        height: 70px;
        cursor: pointer;
        transition: 0.3s ease-in-out;

        &.act {
          border: #000 2px solid;
        }
      }
    }
  }

  .arco-divider {
    margin: 40px 0 !important;
  }
}
</style>