$.getJSON('/assets/data/sample.json', function (data) {
    for (var i = 1; i <= data.length; i++) {
        $('#header').append('<div class=\'rank column\'>' + i + '</div>');
    }
    $('#container').append('<p class=\'clear\'>');
    data.forEach(function (element) {
        var div = $('<div>', {
            id: 'player' + element.id
        });
        $('#container').append(div);
        $(div).append('<div class=\'rank\'>' + element.rank + '</div>');
        $(div).append('<div class=\'name\'><span class=\'first-name\'>' + element.firstName + '</span>&nbsp;<span class=\'last-name\'>' + element.lastName + '</span></div>');
        $(div).append('<div class=\'rating\'>' + element.rating + '</div>');
        $(div).append('<p class=\'clear\'>');
    });
});
