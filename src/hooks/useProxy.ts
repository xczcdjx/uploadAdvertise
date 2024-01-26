import {ComponentInternalInstance, getCurrentInstance, ref} from 'vue';
// 添加断言
export function useProxy() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance
    const loading=ref<boolean>(false)
    return {proxy,loading}
}