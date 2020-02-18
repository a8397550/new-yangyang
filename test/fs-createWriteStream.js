const fs = require('fs');

const json = {a:1, b: 2, c: 3};
const str = JSON.stringify(json, null,2);
const buff = Buffer.from(str);


const writerStream = fs.createWriteStream('../test.txt');

writerStream.write(buff);

writerStream.end();
writerStream.on('finish', function() {
  console.log("写入完成");
});
writerStream.on('error', function(err) {
  console.log(err.stack);
});