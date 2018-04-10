var data = {
  characters: {
    me: {
      name: 'Noémie',
      photo: 'https://img2.closermag.fr/var/closermag/storage/images/article/lucie-lucas-clem-victime-d-un-burn-out-692829/5566602-1-fre-FR/Lucie-Lucas-Clem-victime-d-un-burn-out_exact1024x768_l.jpg'
    },
    other: {
      name: 'Ryan',
      photo: 'http://jjung.perso.univ-pau.fr/jung.jpg'
    }
  },
  dialogue: {
    other: 'C\'est déjà plus intime..',
    me: [
      {
        name: 'C\'est qui? ',
        dialogue: {
          other: 'Ryan!',
          me: [
            {
              name: 'Comment tu l\'as eu ? ',
              dialogue: {
                other: 'Suspens.. Détends toi! :*',
                 me: [ 
                  {
                    name: 'réponse 1', 
                    dialogue: {

                    }
                  },
                  {
                    name: 'réponse 2', 
                    dialogue: {

                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  }
}


var dialogue = data.dialogue;
var answer = null;
var delay = 500;

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

$(function() {
  $('.title').html(data.characters.other.name);
  otherTalks();
});