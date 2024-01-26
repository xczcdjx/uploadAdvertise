import {defineComponent, onMounted, reactive} from "vue";
import './baseSetting.less'
import {Button, Input, Upload} from "@arco-design/web-vue";
import {IconCopy} from "@arco-design/web-vue/es/icon";
import Cupload from "@/components/commonInput/Cupload";
import {copyToClipboard} from "@/utils/copy";
import {useProxy} from "@/hooks/useProxy";
import {useSport} from "@/store";
export default defineComponent({
    name: 'baseSetting',
    props:['domainName','logoUrl','websiteName'],
    setup(props) {
        const form=reactive<{
            domainName:string,
            logoUrl:string,
            websiteName:string
        }>({
            logoUrl: "", domainName: "",websiteName:""
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
                logoUrl: "", domainName: ""
            })
        }
        return () => <div className='baseSetting'>
            <p>
                <span>网站域名</span>
                <Button onClick={()=>{
                    copyToClipboard(form.domainName)
                    proxy?.$message.success('复制成功')
                }} type='primary' size='mini' v-slots={{
                    icon: () => <IconCopy/>
                }}>
                    Copy link</Button>
            </p>
            <p>
                <span>网站名称</span>
                <Input v-model={form.websiteName} placeholder='网站名称长度为4-16位' size='large'/>
            </p>
            <p>
                <Cupload onFile={(f)=>{
                    console.log(f)}} url={'logoUrl'} tit='logo 配置'/>
            </p>
            <p>
                <Button onClick={Submit} type='primary' loading={loading.value}>Submit</Button> &nbsp;&nbsp;
                <Button onClick={Reset}>Reset</Button>
            </p>
        </div>
    }
})