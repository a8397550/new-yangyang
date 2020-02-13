// https://ejs.bootcss.com/#about

const ejs = require('ejs');

const arr = ['1', '2', '3'];

const html = ejs.render("<div><%= arr.join(',') %></div>", { arr });

console.log('html:', html);

const str = "<div><%= arr.join(',') %></div>";
const options = {
  filename: 'arr'
}

let template = ejs.compile(str, options);
console.log('template:', template({ arr }));
// => 输出渲染后的 HTML 字符串

console.log('render: ', ejs.render(str, { arr }, options));
// => 输出渲染后的 HTML 字符串

ejs.renderFile('../view/index.html', { csrfToken: '12345678' }, options, function (err, str) {
  // str => 输出渲染后的 HTML 字符串
  console.log('=================================')
  console.log(str);
});