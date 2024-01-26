/*
var img = new Image();
img.src = 'your_image_url'; // 替换为你的图片URL
// 图片加载完成后，将其绘制到canvas上
img.onload = function() {
    getBase64(img);
};
*/

/**图片转base64格式 */
export function getBase64(image) {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    context!.drawImage(image, 0, 0, image.width, image.height);
    // 将canvas的内容转换为base64编码的字符串
    const base64 = canvas.toDataURL("image/png");// 可以根据需要更改为其他格式，如'image/jpeg'等
    return base64;
}