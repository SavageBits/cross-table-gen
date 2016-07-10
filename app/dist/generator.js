$.getJSON('/assets/data/sample.json', function (data) {
    sortPlayers(data);
    var numberOfPlayers = data.length;
    printMatchColumnHeaders(numberOfPlayers);
    $('#container').append('<p class=\'clear\'>');
    data.forEach(function (element) {
        var div = $('<div>', {
            id: 'player' + element.id
        });
        $('#container').append(div);
        $(div).append('<div class=\'rank\'>' + element.rank + '</div>');
        $(div).append('<div class=\'name\'><span class=\'first-name\'>' + element.firstName + '</span>&nbsp;<span class=\'last-name\'>' + element.lastName + '</span></div>');
        $(div).append('<div class=\'rating\'>' + element.rating + '</div>');
        for (var i = 0; i < numberOfPlayers; i++) {
            if (element.rank === i + 1)
                $(div).append('<div class=\'rank match-score\'>X</div>');
            else
                $(div).append('<div class=\'rank match-score\'>' + getMatchScore(element.id, data[i].id) + '</div>');
        }
        $(div).append('<p class=\'clear\'>');
    });
});
function sortPlayers(data) {
    data.sort(function (a, b) {
        return parseInt(a.rank) - parseInt(b.rank);
    });
}
function printMatchColumnHeaders(numberOfPlayers) {
    for (var i = 1; i <= numberOfPlayers; i++) {
        $('#header').append('<div class=\'rank column\'>' + i + '</div>');
    }
}
function getMatchScore(player1, player2) {
    return 1;
}
