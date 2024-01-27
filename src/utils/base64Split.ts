const format=['image/jpg','image/jpeg','image/png']
const base64Split = (url:string) => {
    let [type,value]=url.split(';base64,')
    // if (!format.includes(type)) throw new Error('格式不正确')
    return {
        prefix:type,
        concatValue:';base64,',
        value
    }
}
export {
    base64Split
}