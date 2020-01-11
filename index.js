const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

let config;

if (process.env.NODE_ENV === 'development') {
  config = require('./config/webpack.dev.js');
  console.log('config dev')
} else {
  config = require('./config/webpack.prod.js');
  console.log('config prod')
}

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(express.static(__dirname + '/public'));
// app.use(multiparty({uploadDir:'/upload' }));//设置上传文件存放的地址

app.use(bodyParser.json())   //在其他路由中间件前（尽可能靠前，以能够通过bodyPaser获取req.body）
app.use(bodyParser.urlencoded({ extended: false })) // 调试工具如果出现警告请加上extended: false

app.post('/api/form', multipartMiddleware, function (req, res) {
  const body = req.body;
  const files = req.files;

  res.send("formdata");
});

app.get('/', function (req, res) {
  res.send('Hello World')
})


app.use(function (req, res, next) { // 第一个路由
  console.log('第一个中间件')
  next();
});

app.get('/api', function (req, res) {
  const body = req.body; // 内容主体，post，put，delete 参数不在url中
  res.send(`get${JSON.stringify(body)}`);
})

app.post('/api', function (req, res) {
  const body = req.body; // 内容主体，post，put，delete 参数不在url中
  res.send(`post${JSON.stringify(body)}`);
})

app.delete('/api', function (req, res) {
  const body = req.body; // 内容主体，post，put，delete 参数不在url中
  res.send(`delete${JSON.stringify(body)}`);
})

app.put('/api', function (req, res) {
  const body = req.body; // 内容主体，post，put，delete 参数不在url中

  res.send(`put${JSON.stringify(body)}`);
})

app.get('/test', function (req, res, next) {
  console.log('next');
  next()
}, function (req, res) {
  res.send('test')
});

app.get('/user/:userId(\\d+)/:userName', function (request, response) {
  const body = request.body; // 内容主体，post，put，delete 参数不在url中
  const params = request.params; // {userId: ':userId', userName: ':userName'}
  const query = request.query; // ?a=1&b=1&c=3 {a:1, b:2, c:3}

  response.send({
    body,
    params,
    query
  })
})

app.get(/\/.*/, function (req, res) {
  res.send('任意的 404')
})

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type('text/plain');
  res.status('500')
  res.end('500 - Server Erroe');
});

const port = 3000;

app.listen(port, () => console.log(`服务已启动，端口${port}`))
