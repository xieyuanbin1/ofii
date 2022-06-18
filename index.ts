import facenn from 'facenn'
import imagecodec from 'imagecodec'

// 获取图片上的人脸特征信息
export = function getFaceFeature(picture: ArrayBuffer) {
  if (!picture) {
    return
  }
  // 判断文件类型
  let type = ''
  const PNG = 'png'
  // const JPG = 'jpg'
  const arr = (new Uint8Array(picture)).subarray(0, 4)
  const headerString = arr.reduce((acc, cur) => acc+cur.toString(16), '')
  switch (headerString) {
    case "89504e47":
      type = "png";
      break
    case "47494638":
      type = "gif";
      break
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
      type = "jpg"
      break
    default:
      type = 'jpg'
      console.log('[mime-type] not png/gif/jpg.')
      break
  }
  const bitmap = imagecodec.decode(picture as any, {
    components: type === PNG ? imagecodec.COMPONENTS_RGB_ALPHA : imagecodec.COMPONENTS_RGB
  })
  if (!bitmap || !bitmap.buffer) {
    return
  }
  const faces = facenn.detect(bitmap.buffer, {
    width: bitmap.width,
    height: bitmap.height,
    pixelFormat: type === PNG ? facenn.PIX_FMT_RGBA2RGB24 : facenn.PIX_FMT_RGB24
  }, true)
  const faceFeatures = [];
  if (faces.length) {
    let feature;
    faces.map((item) => {
      feature = facenn.feature(bitmap.buffer, {
        width: bitmap.width,
        height: bitmap.height,
        pixelFormat: type === PNG ? facenn.PIX_FMT_RGBA2RGB24 : facenn.PIX_FMT_RGB24
      }, item, {
        live: true,
        emotion: true
      })
      faceFeatures.push(feature);
    })
  }
  return faceFeatures
}