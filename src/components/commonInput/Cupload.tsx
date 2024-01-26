import {defineComponent, getCurrentInstance, PropType} from "vue";
import {FileItem, Space, Upload} from "@arco-design/web-vue";
import {useProxy} from "@/hooks/useProxy";
import {settingupload} from "@/rapi/url";
import {getToken} from "@/utils/auth";

export default defineComponent({
    name:'cUpload',
    props:{
        url:{
            type:String,
            // required:true
        },
        tit:{
            type:String,
            required:true
        },
        defaultImg:{
            type:Array as PropType<Record<'uid'|'name'|'id', string>[]>,
        }
    },
    emits:['file'],
    setup(props,{emit}) {
        // const message=getCurrentInstance().appContext.config.globalProperties.$message
        const allowList=['image/png','image/jpg','image/jpeg']
        const {proxy}=useProxy()
        const headers={}
        const beforeUpload = (file:File) => {
            if (!allowList.includes(file.type)){
                proxy?.$message.error('上传格式必须为jpg或jpeg或png')
                return false
            }
            else if (file.size>1024*1000){
                proxy?.$message.error('上传大小必须为小于500kb')
                return false
            }
            return true
        }
        const onError = (fileItem:FileItem)=>{
            // console.log(fileItem)
            proxy?.$message.error(fileItem.response)
        }
        const customRequest = (option) => {
            const {onProgress, onError, onSuccess, fileItem, name} = option
            const xhr = new XMLHttpRequest();
            if (xhr.upload) {
                xhr.upload.onprogress = function (event) {
                    let percent;
                    if (event.total > 0) {
                        // 0 ~ 1
                        percent = event.loaded / event.total;
                    }
                    onProgress(percent, event);
                };
            }
            xhr.onerror = function error(e) {
                onError(e);
            };
            xhr.onload = function onload() {
                if (xhr.status < 200 || xhr.status >= 300) {
                    return onError(xhr.responseText);
                }
                const res=JSON.parse(xhr.response)
                if (res.resCode!=='000000'){
                    return onError(res.resDesc)
                }
                onSuccess(xhr.response);
            };
            const reader = new FileReader();
            reader.onload = function(e) {
                // const base64 = e.target!.result;
                // const formData = new FormData();
                // console.log(base64,fileItem.file)
                // formData.append(name || 'file', base64);
                let data={
                    // @ts-ignore
                    [props.url]:e.target!.result
                }
                xhr.open('post', proxy!.$i+settingupload, true);
                xhr.setRequestHeader('Authorization',getToken()!)
                // @ts-ignore
                xhr.setRequestHeader('type',props.url)
                xhr.send(e.target!.result);
            };
            reader.readAsDataURL(fileItem.file)
            return {
                abort() {
                    xhr.abort()
                }
            }
        };
        return () => <Space>
            <span style={{color:'var(--color-text-1)'}}>{props.tit}</span>
            <Upload
                headers={headers}
                // tip={' 上传jpg/png文件，不超过500kb '}
                defaultFileList={
                    []
                }
                imagePreview={true}
                action={props.url}
                customRequest={customRequest}
                limit={1}
                onBeforeUpload={beforeUpload}
                onSuccess={(fileItem:FileItem)=>emit('file',fileItem)}
                onError={onError}
                list-type="picture-card"/>
        </Space>
    }
})