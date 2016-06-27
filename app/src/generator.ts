/// <reference path="../../assets/lib/jquery.d.ts" />

console.log('generator');

$.getJSON('/assets/data/sample.json', function(data) {
  data.forEach(element => {
    console.log(element);
  });
});