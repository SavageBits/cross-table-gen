/// <reference path="../../assets/lib/jquery.d.ts" />

$.getJSON('/assets/data/sample.json', function(data) {
  sortPlayers(data);

  let numberOfPlayers: number = data.length;
  printMatchColumnHeaders(numberOfPlayers);
   
  $('#container').append('<p class=\'clear\'>');
  
  data.forEach(element => {
    let div = $('<div>', {
      id: 'player' + element.id,
      class: 'player'
    });
    
    $('#container').append(div);
    
    $(div).append('<div class=\'rank rank-row\'>' + element.rank + '</div>'); //rank should be derived, similar to score and based on score
    $(div).append('<div class=\'name\'><span class=\'first-name\'>' + element.firstName + '</span>&nbsp;<span class=\'last-name\'>' + element.lastName + '</span></div>');
    $(div).append('<div class=\'rating\'>' + element.rating + '</div>');

    for (var i = 0; i < numberOfPlayers; i++) {
      if (element.rank === i + 1)
        $(div).append('<div class=\'rank match-score self\'>X</div>'); 
      else
        $(div).append('<div class=\'rank match-score\'>' + getMatchPoints(data, element.id, data[i].id) + '</div>');
    }

    $(div).append('<div class=\'score\'>' + getTotalPoints(data, element.id) + '</div>');
    $(div).append('<p class=\'clear\'>');
  });
});

function sortPlayers(data) {
  //should sort by rank before anything else
  //but may eventually be sorted by sum of match scores
  data.sort(function(a, b) {
    //console.log(a + ' : ' + b);
    //console.log(getTotalPoints(data,a.id) + ' : ' + getTotalPoints(data,b.id));
    //return parseInt(a.rank) - parseInt(b.rank);
    //return parseFloat(getTotalPoints(data,a.id)) - parseFloat(getTotalPoints(data,b.id));
    return getTotalPoints(data,b.id) - getTotalPoints(data,a.id);
  });
}

function printMatchColumnHeaders(numberOfPlayers: number) {
  for (var i = 1; i <= numberOfPlayers; i++) {
    var alternateClass = i % 2 == 0 ? '' : 'rank-alternate';
    $('#header').append('<div class=\'rank ' + alternateClass + ' column\'>' + i + '</div>');    
  }

  $('#header').append('<div class=\'score\'>Score</div>');
}

function getMatchPoints(data, player1Id, player2Id) {
  var player1 = findPlayer(data, player1Id);
  
  var matchPoints = null;

  for (var i = 0; i < player1.matches.length; i++) 
    if (player1.matches[i].playerId == player2Id) 
      matchPoints = player1.matches[i].points;

  if (matchPoints == 0.5) 
    matchPoints = '1/2';  

  return matchPoints == null ? '' : matchPoints;
}

function getTotalPoints(data, playerId) {
  var player = findPlayer(data, playerId);

  // console.log('found player ' + player);

  var score = 0;

  if (typeof player.id != 'undefined') {
    player.matches.forEach(element => {
      score += element.points;
    });
  }

  return score;
}

function findPlayer(data, playerId) {
  let player = {};

  for (var i = 0; i < data.length; i++) 
     if (data[i].id === playerId)
       player = data[i];

  return player;
}



