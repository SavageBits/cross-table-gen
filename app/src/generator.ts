/// <reference path="../../assets/lib/jquery.d.ts" />

$.getJSON('/assets/data/sample.json', function(data) {
  data.forEach(element => {
    var div = $('<div>', {
      id: 'player' + element.id
    });
    
    $('#container').append(div);
    
    // $(div).append('<div id=\'' + element.id + '\'></div>');
    $(div).append('<div class=\'rank\'>' + element.rank + '</div>')
    $(div).append('<divclass=\'name\'><span class=\'first-name\'>' + element.firstName + '</span>&nbsp;<span class=\'last-name\'>' + element.lastName + '</span></div>');
  });
});