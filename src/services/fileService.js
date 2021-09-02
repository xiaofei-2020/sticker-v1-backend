const https = require('https');

/**
 * FileService

 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 */
class FileService {
  async download(src) {
    return new Promise ((resolve, reject)=>{
      https.get(src, (res) => {
        if (res.statusCode !== 200) {
          reject()
        }
        let rawData = '';
        res.setEncoding('binary');
        // A chunk of data has been recieved.
        res.on('data', (chunk) => {

          rawData += chunk;
        });
        // The whole response has been received.
        res.on('end', () => {

          resolve(rawData);
        });
          
      }).on("error", (err) => {
          reject(err.message)
        });
    })
  }
}

// 导出 Service 的实例
module.exports = new FileService();
