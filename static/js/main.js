var SpeechSynthesis = speechSynthesis;
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var isListening = false;

var recognition = new SpeechRecognition();

recognition.lang = 'ja-JP';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = true;

function speak(message) {
  var uttr = new SpeechSynthesisUtterance(message);
  uttr.lang = 'ja-JP';
  SpeechSynthesis.speak(uttr);
}

function lightOffIntent() {
  $.ajax({
    url: '/lightOff',
    method: 'GET',
  })
  .done(function(response) {
    speak('電気を消しました');
  })
  .error(function(response) {
    speak('エラーが発生しました');
  });
}

function lightOnIntent() {
  $.ajax({
    url: '/lightOn',
    method: 'GET',
  })
  .done(function(response) {
    speak('電気をつけました');
  })
  .error(function(response) {
    speak('エラーが発生しました');
  });
}

function handlingResult(serverResponse) {
  var query = serverResponse.result.resolvedQuery;
  var message = serverResponse.result.fulfillment.speech;
  var action = serverResponse.result.action;

  $("#user_input").text(query);
  switch (action) {
    case 'input.what':
      whatIntent();
      break;
    default:
      break;
  }
  speak(message);
}

recognition.onstart = function(event) {
  console.log('recognition start');
}

recognition.onend = function(event) {
  console.log('recognition end');
  if (isListening == false) {
    restart();
  }
}

recognition.onerror = function(event) {
  console.log('recognition end');
  if (isListening == false) {
    restart();
  }
}

recognition.onresult = function(event) {
  console.log('recognition onresult');
  var len = event.results.length;
  var verb = event.results[len - 1][0].transcript;

  if (isListening == true) {
    var client = new ApiAi.ApiAiClient(
        {
          accessToken: '71849301f140436595c609dac51467e0',
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
