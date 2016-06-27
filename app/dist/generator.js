console.log('generator');
$.getJSON('/assets/data/sample.json', function (data) {
    data.forEach(function (element) {
        console.log(element);
    });
});
