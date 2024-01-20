import {defineComponent, getCurrentInstance} from "vue";
import {FileItem, Space, Upload} from "@arco-design/web-vue";

export default defineComponent({
    name:'cUpload',
    props:['url','tit'],
    emits:['onFile'],
    setup(props,{emit}) {
        // const message=getCurrentInstance().appContext.config.globalProperties.$message
        const headers={}
        const onError = (fileItem:FileItem)=>{
            console.log(fileItem)
            // message.error({content:'上传失败'})
        }
        return () => <Space>
            <span style={{color:'var(--color-text-1)'}}>{props.tit}</span>
            <Upload
                headers={headers}
                // tip={' 上传jpg/png文件，不超过500kb '}
                action={props.url}
                limit={1}
                success={(fileItem:FileItem)=>emit('onFile',fileItem)}
                error={onError}
                list-type="picture-card"/>
        </Space>
    }
})