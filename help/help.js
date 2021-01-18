export const debounce = (func, ms = 1000) => {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, ms)
  }
} 

/**
 * @description 因为图片太大了,上传的时候转换一下
 */
export function dealImage(base64) {
  return new Promise(resolve => {
    var newImage = new Image();
    let quality = 1;    //压缩系数0-1之间
    // 根据 base64 的长度来断定压缩比例 
    // 10000000 差不多是 8M左右
    const unit = 10000
    if (base64.length > 1000*unit) {
      quality = 0.1
    } else if (base64.length > 700*unit && base64.length <= 1000*unit) {
      quality = 0.2
    }else if (base64.length > 500*unit && base64.length <= 700*unit) {
      quality = 0.3
    }else if (base64.length > 300*unit && base64.length <= 500*unit) {
      quality = 0.4
    }else if (base64.length > 100*unit && base64.length <= 300*unit) {
      quality = 0.5
    }else if (base64.length > 50*unit && base64.length <= 100*unit) {
      quality = 0.6
    }else if (base64.length > 10*unit && base64.length <= 50*unit) {
      quality = 0.8
    }
    newImage.src = base64;
    newImage.setAttribute("crossOrigin", 'Anonymous');	//url为外域时需要
    var imgWidth, imgHeight;
    newImage.onload = function () {
      imgWidth = this.width;
      imgHeight = this.height;
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
      const base64 = canvas.toDataURL("image/jpeg", quality); 
      resolve(base64)
    }
  })
  
}