/**
 * 
 * @param option :
 * @param cb :
 */
export const resize = (option: Option, cb: (data: any/*base64, ab*/) => void) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = '';
    img.onload = () => {
        let scale = (img.width < img.height) ? (option.width / img.width) : (option.width / img.height);
        scale = (scale < 1) ? scale : 1;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        let base64 = null;
        if (option.type === 'jpeg') {
            base64 = canvas.toDataURL(`image/${option.type}`, option.ratio || 0.92);
        } else {
            base64 = canvas.toDataURL(`image/${option.type}`);
        }
        const mimeString = base64.split(',')[0].split(':')[1].split(';')[0]; // mime类型
        const byteString = atob(base64.split(',')[1]); // base64 解码
        const arrayBuffer = new ArrayBuffer(byteString.length); // 创建缓冲数组
        const intArray = new Uint8Array(arrayBuffer); // 创建视图
        for (let i = 0; i < byteString.length; i += 1) {
            intArray[i] = byteString.charCodeAt(i);
        }
        if (cb) cb({ base64, ab: arrayBuffer });
    };
    img.src = option.url;
};

interface Option {
    url: string;
    width: number;
    ratio: number;
    // tslint:disable-next-line:no-reserved-keywords
    type: string;
}