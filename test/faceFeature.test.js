
(function assertEdgeros () {
  if (!(global.sys &&
      sys.kernName &&
      sys.kernName() === 'SylixOS')) {
    throw Error('This is script require EdgerOS !!')
  }
})()

const assert = require('assert')
const fs = require('fs')
const getFaceFeature = require('../src/index')

function deepEqual(x, y) {
  if (x === y) {
      return true;
  }
  if (!(typeof x == "object" && x != null) || !(typeof y == "object" && y != null)){
      return false;
  }
  //比较对象内部
  if (Object.keys(x).length != Object.keys(y).length){
      return false;
  }
  for (var prop in x) {
      if (y.hasOwnProperty(prop))
      {  
          if (!deepEqual(x[prop], y[prop])){
              return false;
          }
      }
      else{
          return false;
      }
  }
  return true;
}

function test (desc, testcase) {
  console.info(desc)
  assert.deepEqual = deepEqual
  testcase(assert)
}

console.inspectEnable = true
test('测试包含人类面部信息的图像(jpg)', t => {
  const imageBuffer = fs.readFile('./human.jpg')
  const face = getFaceFeature(imageBuffer)
  t.ok(face[0].keys, '应该包含 face keys')
  t.ok(face[0].age >= 0, '年龄在取值范围之内')
  t.ok(face[0].live >= 0 && face[0].live <= 1, 'Living probability 在取值范围之内')
})

test('测试包含人类面部信息的图像(png)', t => {
  const imageBuffer2 = fs.readFile('./human2.png')
  const face = getFaceFeature(imageBuffer2)
  t.ok(face[0].keys, '应该包含 face keys')
  t.ok(face[0].age >= 0, '年龄在取值范围之内')
  t.ok(face[0].live >= 0 && face[0].live <= 1, 'Living probability 在取值范围之内')
})

test('测试不包含人类面部信息的图像', t => {
  const imageBuffer2 = fs.readFile('./black.jpg')
  const face = getFaceFeature(imageBuffer2)
  console.log('::', face)
  t.equal(face.length, 0, '没有面部信息')
})
