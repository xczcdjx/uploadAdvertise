import { AxiosResponse } from 'axios'
import { App } from 'vue'
import request from './axios.config'

export interface HttpOption {
  url: string
  data?: any
  method?: string
  headers?: any
  beforeRequest?: () => void
  afterRequest?: () => void
}

export interface Response<T = any> {
  resCode: string
  resDesc: string
  resultSet: T
}

function http<T = any>({
  url,
  data,
  method,
  headers,
  beforeRequest,
  afterRequest,
}: HttpOption) {
  const successHandler = (res: AxiosResponse<Response<T>>) => {
    if (res.data.resCode === '000000') {
      return res.data
    }
    else if (res.data.resCode==='000104'){
      window.alert('登录失效,请重新登录')
      // store.commit('user/LOGOUT')
      // clearStorage()
      window.location.reload()
      // return undefined
    }
    throw new Error(res.data.resDesc || '请求失败，未知异常')
  }
  const failHandler = (error: Response<Error>) => {
    afterRequest && afterRequest()
    throw new Error(error.resDesc || '请求失败，未知异常')
  }
  beforeRequest && beforeRequest()
  method = method || 'GET'
  const params = Object.assign(
    typeof data === 'function' ? data() : data || {},
    {}
  )
  return method === 'GET'
      ? request.get(url, { params }).then(successHandler, failHandler)
      : method === 'POST'?request.post(url, params, { headers: headers }).then(successHandler, failHandler)
          :method === 'PUT'?request.put(url, params, { headers: headers }).then(successHandler, failHandler):
              request.delete(url, { params }).then(successHandler, failHandler)
}

export function get<T = any>({
  url,
  data,
  method = 'GET',
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    beforeRequest,
    afterRequest,
  })
}

export function post<T = any>({
  url,
  data,
  method = 'POST',
  headers,
  beforeRequest,
  afterRequest,
}: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    headers,
    beforeRequest,
    afterRequest,
  })
}
export function deleteT<T=any>({
                                 url,
                                 data,
                                 method = 'DELETE',
                                 beforeRequest,
                                 afterRequest,
                               }: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    beforeRequest,
    afterRequest,
  })
}
export function put<T=any>({
                             url,
                             data,
                             method = 'PUT',
                             headers,
                             beforeRequest,
                             afterRequest,
                           }: HttpOption): Promise<Response<T>> {
  return http<T>({
    url,
    method,
    data,
    headers,
    beforeRequest,
    afterRequest,
  })
}
function install(app: App): void {
  app.config.globalProperties.$http = http

  app.config.globalProperties.$get = get

  app.config.globalProperties.$post = post
  app.config.globalProperties.$put = put
  app.config.globalProperties.$deleteT = deleteT
}

export default {
  install,
  get,
  post,
  put,
  deleteT
}

declare module 'vue' {
  // 为 `this.$` 提供类型声明
  interface ComponentCustomProperties {
    $get: <T>(options: HttpOption) => Promise<Response<T>>
    $post: <T>(options: HttpOption) => Promise<Response<T>>
    $put: <T>(options: HttpOption) => Promise<Response<T>>
    $deleteT: <T>(options: HttpOption) => Promise<Response<T>>
  }
}
