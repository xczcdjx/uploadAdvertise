import {defineComponent, reactive} from "vue";
import './baseSetting.less'
import {Button, Input, Upload} from "@arco-design/web-vue";
import {IconCopy} from "@arco-design/web-vue/es/icon";
import Cupload from "@/components/commonInput/Cupload";
import {copyToClipboard} from "@/utils/copy";
export default defineComponent({
    name: 'baseSetting',
    setup() {
        const form=reactive<{
            webArea:string,
            logo:string,
        }>({
            logo: "", webArea: ""
        })
        const Submit=()=>{
            console.log(form)
        }
        const Reset=()=>{
            Object.assign(form,{
                logo: "", webArea: ""
            })
        }
        return () => <div className='baseSetting'>
            <p>
                <span>网站域名</span>
                <Button onClick={()=>copyToClipboard(form.webArea)} type='primary' size='mini' v-slots={{
                    icon: () => <IconCopy/>
                }}>
                    Copy link</Button>
            </p>
            <p>
                <span>网站域名</span>
                <Input v-model={form.webArea} placeholder='网站名称长度为4-16位' size='large'/>
            </p>
            <p>
                <Cupload tit='LOGO 配置'/>
            </p>
            <p>
                <Button onClick={Submit} type='primary'>Submit</Button> &nbsp;&nbsp;
                <Button onClick={Reset}>Reset</Button>
            </p>
        </div>
    }
})