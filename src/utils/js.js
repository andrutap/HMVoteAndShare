export function checkMobile () {
 var check = false;
  (function(a) {if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check
}

export function fixBody () {
  var body = document.querySelector('body')
  if (document.querySelectorAll('.modal').length > 0) {
    body.style.overflowY = 'hidden'
    if (checkMobile()) {
      body.style.position = 'fixed'
    }
  } else {
    body.style.overflowY = 'auto'
    body.style.position = 'initial'
  }
}

export function updateHeartCount (e) {
  var holder = e.target;
  var counter = 0;
  if (holder.querySelectorAll('.heart, .counter')) {
    var heart = holder.querySelector('.heart');
    heart.classList.toggle('animated');
  }
}

export function previewImage (e) {
  var preview = document.querySelector('.image-preview')
  var input = e.target
  var canvas = document.querySelector('#canvas')
  if(canvas != null) {
    var ctx = canvas.getContext('2d')
  }
  if (input.files && input.files[0]) {
    var reader = new FileReader
    reader.onload = (e) => {
      if (preview != null) {
        preview.src = e.target.result
        preview.onload = function(){
          if(checkMobile()) {
            var ratio = preview.width / preview.height
            ctx.save()
            ctx.translate(400, 0)
            ctx.rotate(90 * Math.PI / 180)
            ctx.drawImage(preview, 0, 0, 400 * ratio - .125, 400)
            ctx.restore();
          } else {
            var ratio = preview.height / preview.width
            ctx.save()
            ctx.fillRect(0, 0, 400, 400)
            ctx.drawImage(preview, 0, 0, 400, 400 * ratio)
            ctx.restore()
          }
        }
      }
    }
    reader.readAsDataURL(input.files[0])
  }
}

export function saveDataURL(data, item) {
  var saveData = data.toDataURL()
  localStorage.setItem(item, saveData)
}

export function loadDataURL(data, item) {
  var dataURL = localStorage.getItem(item)
  var img = data
  if (img != null) {
    img.src = dataURL
  }
}

export function loadOnCanvas(item) {
  var canvas = document.querySelector('#canvas')
  var ctx = canvas.getContext('2d')
  var image = new Image()
  var dataURL = localStorage.getItem(item)
  image.src = dataURL
  image.onload = function () {
    if(checkMobile()) {
      var ratio = image.width / image.height
      ctx.save()
      ctx.translate(400, 0)
      ctx.rotate(90 * Math.PI / 180)
      ctx.drawImage(image, 0, 0, 400 * ratio - .125, 400)
      ctx.restore();
    } else {
      var ratio = image.height / image.width
      ctx.save()
      ctx.fillRect(0, 0, 400, 400)
      ctx.drawImage(image, 0, 0, 400, 400 * ratio)
      ctx.restore()
    }
  }
}

var mediaStream, webcamStream

export function cameraInit(selector) {
  var video = document.querySelector(selector)
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  }).then((mediaStream) => {
    video.srcObject = mediaStream
    video.onloadedmetadata = function () {
      video.play()
    }
    webcamStream = mediaStream
  }).catch((error) => {
    alert('The following error has occured: ' + error.name)
  })
}

export function cameraEnd () {
  webcamStream.getTracks()[0].stop()
}

export function snap (selector) {
  var snapCanvas = document.querySelector(selector)

  var video = document.querySelector('#video')
  var videoRect = video.getBoundingClientRect()
  var vW = videoRect.width
  var vH = videoRect.height
  var frame = document.querySelector('.video-mask')
  var rect = frame.getBoundingClientRect()
  if(selector != null) {
    var ctx = snapCanvas.getContext('2d')
  }
  ctx.drawImage(video, videoRect.left - rect.left, 0, vW, vH)
  console.log(rect)
console.log(videoRect.left - rect.left)
}
