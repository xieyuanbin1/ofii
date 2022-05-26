import facenn from 'facenn'
import imagecodec from 'imagecodec'

// 获取图片上的人脸特征信息
export default function getFaceFeature(picture: Buffer | string) {
  if (!picture) {
    return
  }
  const bitmap = imagecodec.decode(picture, {
    components: imagecodec.COMPONENTS_RGB
  })
  if (!bitmap || !bitmap.buffer) {
    return
  }
  const faces = facenn.detect(bitmap.buffer, {
    width: bitmap.width,
    height: bitmap.height,
    pixelFormat: facenn.PIX_FMT_RGB24
  }, true)
  const faceFeatures = [];
  if (faces.length) {
    let feature;
    faces.map((item) => {
      feature = facenn.feature(bitmap.buffer, {
        width: bitmap.width,
        height: bitmap.height,
        pixelFormat: facenn.PIX_FMT_RGB24
      }, item, {
        live: true,
        emotion: true
      })
      faceFeatures.push(feature);
    })
  }
  return faceFeatures
}