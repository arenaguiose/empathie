// Initialize

var data = null;
var dialogue = null;
var answer = null;
var delay = 500;

// Start

$(function() {
  $.getJSON( 'scenarii/noemie.json', function( dataLoaded ) {
    data = dataLoaded;
    dialogue = data.dialogue
    setTitle();
    otherTalks();
  });
});

// Functions

function setTitle() {
  $('.title').html(data.characters.other.name);
}

function otherTalks() {
  setTimeout(function() {
    if (dialogue.other === undefined) {
      end();
    } else {
      $('.chatlogs').append('<div class="chat friend"><div class="user-photo"><img src="' + data.characters.other.photo + '" class="one"></div><p class="chat-message">' + dialogue.other + '</p></div>');
      iTalk();
    }
  }, delay);
}

function iTalk() {
  setTimeout(function() {
    if (dialogue.me.length == 1) {
      iAutoAnswer();
    } else {
      iChoose();
    }  
  }, delay);
}

function iAutoAnswer() {
  answer = dialogue.me[0];
  iAnswer();
}

function iAnswer() {
  $('.chatlogs').append('<div class="chat self"><img src="' + data.characters.me.photo + '" class="two"><div class="user-photo"></div><p class="chat-message">' + dialogue.me[0].name + '</p></div>');
  dialogue = answer.dialogue;
  otherTalks();
}

function iChoose() {
  for (var i = 0; i < dialogue.me.length; i++) {
    var option = dialogue.me[i];
    $('.chatform').append('<div class="option" data-index="' + i + '">' + option.name + '</div>');
    $('.chatform div').click(function() {
      var index = $(this).data('index');
      answer = dialogue.me[index];
      $('.chatform').html('');
      iAnswer();
    })
  }
}

function end() {
  alert('FIN');
}