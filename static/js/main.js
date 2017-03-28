var SpeechSynthesis = speechSynthesis;
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var isListening = false;

var recognition = new SpeechRecognition();

recognition.lang = 'ja-JP';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = true;

recognition.onstart = function(event) {
  console.log('recognition start');
  var uttr = new SpeechSynthesisUtterance('聞くのを開始します');
  SpeechSynthesis.speak(uttr);
}

recognition.onend = function(event) {
  
}

recognition.onerror = function(event) {

}

recognition.onresult = function(event) {

}

