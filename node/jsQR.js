import jsQR from "jsqr";

// 访问用户媒体设备的兼容方法 
function getUserMedia(constraints, success, error) {
  if (navigator.mediaDevices.getUserMedia) {
    // 最新标准API
    navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
  } else if (navigator.webkitGetUserMedia) {
    // WebKit老版本API
    navigator.webkitGetUserMedia(constraints, success, error)
  } else if (navigator.mozGetUserMedia) {
    // Firefox老版本API
    navigator.mozGetUserMedia(constraints, success, error);
  }
}

// 访问摄像头
const constraints = { video: { facingMode: 'environment' } };

getUserMedia(constraints, stream => {
  // 成功,获取到视频流
}, error => {
  // 失败
}); 

const video = document.querySelector('video');
const codeReader = new jsQR(video, data => {
  // 处理扫描成功
});


codeReader.decodeContinuously();