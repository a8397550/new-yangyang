const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

let config;

if (process.env.NODE_ENV === 'development') {
  /**
   * echo $NODE_ENV // 查看是否有环境变量
   * export NODE_ENV=development // 设置环境变量
   * unser NODE_ENV // 删除环境变量
   */
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



app.get(/\/.*/, function (req, res) {
  console.error(err.stack);
  res.type('text/plain');
  res.status('404')
  res.end('Not Found 404');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type('text/plain');
  res.status('500')
  res.end('500 - Server Erroe');
});

const port = 3000;

app.listen(port, () => console.log(`服务已启动，端口${port}`))
