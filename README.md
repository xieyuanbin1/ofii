# ofii
Obtaining facial information from images for EdgerOS APP.

facenn 模块的 detect() 方法和 feature() 方法支持从视频流中截取图像帧以解析人脸特征信息，但是有时候我们需要从单张图片中解析人脸信息，此时就需要我们使用 imagecodec 模块手动将图片进行转码。
这里将整个流程封装成为一个包，以方便解析过程。

# Install
```shell
npm install @edgeros/ofii
```

# Usage

```typescript
import getFaceFeature from '@edgeros/ofii'

const keys = getFaceFeature(imageBuffer)
```

# Todo
[ ] support image url.
