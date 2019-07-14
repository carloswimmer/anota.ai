window.SpeechRecognition = window.webkitSpeechRecognition ||
  window.SpeechRecognition
var notification = document.querySelector('.notification')
var alert = document.querySelector('.alert')
var information = document.querySelector('.information')
var recognizing
var recognition = {}

window.onload = function () {
  if ('SpeechRecognition' in window && 
    typeof window.SpeechRecognition === 'function') {
    letsTakeNote()
    return
  }
  showAlert('danger', 'Esse navegador não tem reconhecimento de voz.<br> Tente o Google Chrome.')
  var controls = document.querySelectorAll('button')
  controls.forEach(item => item.setAttribute('disabled', true))
}

function letsTakeNote () {
  recognition = new window.SpeechRecognition()
  recognition.continuous = true
  reset()
  
  recognition.onend = reset()
  
  recognition.onresult = function (event) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        display.value += event.results[i][0].transcript
      }
    }
  }
}

function reset () {
  recognizing = false
  button.innerHTML = '<i class="fas fa-microphone fa-lg"></i>'
  button.classList.toggle('btn-danger')
}

function toggleStartStop () {
  if (recognizing) {
    recognition.stop()
    reset()
    return
  }
  recognition.start()
  recognizing = true
  button.innerHTML = '<i class="fas fa-microphone-slash fa-lg"></i>'
  button.classList.toggle('btn-danger')
  alert.style.opacity = '0'
  recognition.onspeechend = function () {
    recognition.stop()
    reset()
  }
}

function showAlert (type, message) {
  alert.classList.remove(...['alert-success', 'alert-warning', 'alert-danger'])
  alert.classList.add(`alert-${type}`)
  alert.innerHTML = message
  if (window.innerWidth < 768) {
    notification.style.display = 'flex'
    setTimeout(() => {
      notification.style.opacity = '1'
      alert.style.opacity = '1'
    }, 100)
  } else {
    alert.style.opacity = '1'
  }
  setTimeout(() => {
    hideAlert()
  }, 6000)    
}

function hideAlert () {
  alert.style.opacity = '0'
  if (window.innerWidth < 768) {
    notification.style.opacity = '0'
    setTimeout(() => {
      notification.style.display = 'none'
    }, 300)
  }
}

function clearDisplay () {
  if (recognizing) toggleStartStop()
  display.value = ''
  hideAlert()
}

function copy () {
  if (recognizing) toggleStartStop()
  if (display.value) {
    let element = buildElement(display.value)
    element =  hideElement(element)
    includeSelectCopy(element)
    destroyElement(element)
    showAlert('success', 'Sucesso! Texto copiado para a área de trabalho.')
    return
  }
  showAlert('warning', 'Clique no microfone e diga algo para ser copiado')
}

function buildElement (statement) {
  const element = document.createElement('textarea')
  element.value = statement
  return element
}

function hideElement (element) {
  element.setAttribute('readonly', '')
  element.style.position = 'absolute'
  element.style.left = '-9999px'
  return element
}

function includeSelectCopy (element) {
  document.body.appendChild(element)
  element.select()
  document.execCommand('copy')
}

function destroyElement (element) {
  document.body.removeChild(element)
}

function showInformation () {
  information.style.opacity = '.8'
}

function hideInformation () {
  information.style.opacity = '0'
}