let render = require('preact-render-to-string');
let App = require('./src/components/app').default;

html = render(App);
console.log(html)