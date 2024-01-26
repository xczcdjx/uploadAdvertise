import {defineComponent, getCurrentInstance, PropType} from "vue";
import {FileItem, Space, Upload} from "@arco-design/web-vue";
import {useProxy} from "@/hooks/useProxy";

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
    emits:['onFile'],
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
            console.log(fileItem)
            // message.error({content:'上传失败'})
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
                onSuccess(xhr.response);
            };
            const reader = new FileReader();
            reader.onload = function(e) {
                // const base64 = e.target!.result;
                // const formData = new FormData();
                // console.log(base64,fileItem.file)
                // formData.append(name || 'file', base64);
                xhr.open('post', '//upload-z2.qbox.me/', true);
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
                    [
                        {
                            uid: '-2',
                            name: 'light.png',
                            url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
                        },
                        ]
                }
                imagePreview={true}
                action={props.url}
                customRequest={customRequest}
                limit={1}
                onBeforeUpload={beforeUpload}
                success={(fileItem:FileItem)=>emit('onFile',fileItem)}
                error={onError}
                list-type="picture-card"/>
        </Space>
    }
})