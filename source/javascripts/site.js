// Initialize

var data = null;
var currentDialogue = null;
var currentMessage = null;
var answerChosen = null;
var delay = 0;
var dialogueIndex = 0;
var dialogueEllipsis = 0;

// Start

$(function() {
  $.getJSON( 'scenarii/noemie.json', function( dataLoaded ) {
    data = dataLoaded;
    currentDialogue = data.dialogue
    setHeader();
    showCurrentMessage();
  });
});

// Functions

function setHeader() {
  $('.header').append('<div class="iconesHeader"> <img src = "images/arrow.png" class="icones"><img src="' + data.characters.other.photo +'"  id="head" class="one" id="head"><img src = "images/info.png" class="icones"></div><div class="nomHeader">' + data.characters.other.name + '</div>');
}

function showCurrentMessage() {
  console.log("showCurrentMessage");
  currentMessage = currentDialogue[dialogueIndex];
  delay = currentMessage.delay;
  
/*  if (currentMessage.other) {
    setTimeout(function() {
       otherTalks();
     },delay)
  } else {
      iTalk();
    }
  autoScroll();
}*/
  setTimeout(function() {
  if (currentMessage.other) {
    otherTalks();
  } else {
   iTalk();
  }
    autoScroll();
  }, delay);
}

function autoScroll() {
  $('.chatlogs').scrollTop($('.chatlogs')[0].scrollHeight);
}

function planNextMessage() {
  console.log("planNextMessage");
  dialogueIndex++;
  if (currentDialogue[dialogueIndex] === undefined) {
    setTimeout(end, 3000);
  } else {
    showCurrentMessage();
  }
}

function otherTalks(){
  console.log("otherTalks");
  dialogueEllipsis = currentMessage.ellipsis;
  if (dialogueEllipsis > 0) {
    $('.chatlogs').append('<div class ="ellipsis"><div class="user-photo"><img src="' + data.characters.other.photo + '" class="one"></div><p class="chat-message"><p class="saving"><span>.</span><span>.</span><span>.</span></p></div></div></div>');
    setTimeout(function() { 
      $('.ellipsis').hide();
      $('.chatlogs').append('<div class="chat friend"><div class="user-photo"><img src="' + data.characters.other.photo + '" class="one"></div><p class="chat-message">' + currentMessage.other + '</p></div>');  
  planNextMessage();
    }, dialogueEllipsis);
  }
   else { 
    $('.chatlogs').append('<div class="chat friend"><div class="user-photo"><img src="' + data.characters.other.photo + '" class="one"></div><p class="chat-message>' + currentMessage.other + '</p></div>');  
  planNextMessage();
}
}

function iTalk() {
  console.log("iTalk");
  if (typeof(currentMessage.me) === 'string') {
    iAutoAnswer();
  } else {
    iChoose();
  }
}

function iAutoAnswer() {
  console.log("iAutoAnswer");
  $('.chatlogs').append('<div class="chat self"><img src="' + data.characters.me.photo + '" class="two"><div class="user-photo"></div><p class="chat-message">' + currentMessage.me + '</p></div>');
  planNextMessage();
}

function iChoose() {
  console.log("iChoose");
  for (var i = 0; i < currentMessage.me.length; i++) {
    var option = currentMessage.me[i];
    $('.chatform').append('<div class="option" data-answer-index="' + i + '">' + option.text + '</div>');
    $('.chatform .option').unbind('click').bind('click', function() {
      var answerIndex = $(this).data('answer-index');
      $('.chatform').html('');
      answerChosen = currentMessage.me[answerIndex];
      currentDialogue = answerChosen.dialogue;
      dialogueIndex = -1;
      iAnswer();
    })
  }
}

function iAnswer() {
  console.log("iAnswer");
  $('.chatlogs').append('<div class="chat self"><img src="' + data.characters.me.photo + '" class="two"><div class="user-photo"></div><p class="chat-message">' + answerChosen.text + '</p></div>');
  autoScroll();
  planNextMessage();
}

function end() {
  // console.log("end");
  $('.messageFin').show();
}

function begin() {
  $('.messageDebut').hide();
}