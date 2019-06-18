var recognizing;
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
reset();
recognition.onend = reset();

recognition.onresult = function (event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      display.value += event.results[i][0].transcript;
    }
  }
}

function reset() {
  recognizing = false;
  button.innerHTML = "Clique para Falar";
  button.classList.toggle('btn-danger');
}

function toggleStartStop() {
  if (recognizing) {
    recognition.stop();
    reset();
  } else {
    recognition.start();
    recognizing = true;
    button.innerHTML = "Pare de Escutar";
    button.classList.toggle('btn-danger');
  }
}