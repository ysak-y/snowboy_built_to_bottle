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
  console.log('recognition end');
  var uttr = new SpeechSynthesisUtterance('聞くのをやめます');
  SpeechSynthesis.speak(uttr);
  if (isListening == false) {
    restart();
  }
}

recognition.onerror = function(event) {
  console.log('recognition end');
  var uttr = new SpeechSynthesisUtterance('エラーが発生しました');
  SpeechSynthesis.speak(uttr);
  if (isListening == false) {
    restart();
  }
}

recognition.onresult = function(event) {
  console.log('recognition onresult');
  var len = event.results.length;
  var verb = event.results[lem - 1][0].transcript;

  if (isListening == true) {
    var client = new ApiAi.ApiAiClient(
        {
          accessToken: ,
          lang: 'ja'
        }
    );
    recognition.stop();
    client.textRequest(verb).then(
      function(serverResponse) {
        console.log(serverResponse);
        handlingResult(serverResponse);
        isListening = false;
        recognition.start();
      }
    )
    .catch(
      function(serverError) {
        console.log(serverError);
        isListening = false;
        recognition.start();
      }
    );
  } else {
    if (verb == 'バトラー') {
      isListening = true;
      console.log('start listening');
    } else {
      console.log(verb)
    }
  }

}

function restart() {
  recognition.stop();
  recognition.start();
}

window.onload = recognition.start();