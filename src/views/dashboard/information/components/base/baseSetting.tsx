import {defineComponent} from "vue";
import './baseSetting.less'
import {Button, Input, Upload} from "@arco-design/web-vue";
import {IconCopy} from "@arco-design/web-vue/es/icon";
import Cupload from "@/components/commonInput/Cupload";
export default defineComponent({
    name: 'baseSetting',
    setup() {
        return () => <div className='baseSetting'>
            <p>
                <span>网站域名</span>
                <Button type='primary' size='mini' v-slots={{
                    icon: () => <IconCopy/>
                }}>
                    Copy link</Button>
            </p>
            <p>
                <span>网站域名</span>
                <Input placeholder='网站名称长度为4-16位' size='large'/>
            </p>
            <p>
                <Cupload tit='LOGO 配置'/>
            </p>
            <p>
                <Button type='primary'>Submit</Button> &nbsp;&nbsp;
                <Button>Reset</Button>
            </p>
        </div>
    }
})