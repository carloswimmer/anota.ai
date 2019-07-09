var alertSuccess = document.querySelector('.alert')
alertSuccess.style.display = 'none'
var recognizing
var recognition = new webkitSpeechRecognition()
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

function reset() {
  recognizing = false
  button.innerHTML = '<i class="fas fa-microphone fa-lg"></i>'
  button.classList.toggle('btn-danger')
}

function toggleStartStop() {
  if (recognizing) {
    recognition.stop()
    reset()
  } else {
    recognition.start()
    recognizing = true
    button.innerHTML = '<i class="fas fa-microphone-slash fa-lg"></i>'
    button.classList.toggle('btn-danger')
  }
}

function clearDisplay() {
  display.value = ''
  alertSuccess.style.display = 'none'
}

function copy () {
  let element = buildElement(display.value)
  element =  hideElement(element)
  includeSelectCopy(element)
  destroyElement(element)
  alertSuccess.style.display = 'block'
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