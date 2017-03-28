/**
 * Created by zhangfeichao on 2017/3/28.
 */
var http = require('http');
var url = require('url');
var fs = require('fs');
var param = require('./lib/param');
var path = require('path');
module.exports.create = function (obj) {
    var PORT = obj.RORT || param.RORT,
        mine = param.mineType,
        types = obj.types || {};
    for (var i in types) mine[i] = types[i];
    console.log(obj.path);
    var server = http.createServer(function (request, response) {
        var pathname = url.parse(request.url).pathname,
            realPath = './' + pathname,   //这里设置自己的文件名称;
            ext = path.extname(realPath);
        ext = ext ? ext.slice(1) : 'unknown';
        fs.exists(realPath, function (exists) {
            if (!exists) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
            } else {
                fs.readFile(realPath, "binary", function (err, file) {
                    if (err) {
                        response.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                        response.end(err);
                    } else {
                        var contentType = mine[ext] || "text/plain";
                        response.writeHead(200, {
                            'Content-Type': contentType
                        });
                        response.write(file, "binary");
                        response.end();
                    }
                });
            }
        });
    });
    server.listen(PORT);
    console.log("Server runing at port: " + PORT + ".");
};

// create({
//     RORT: 1602,
//     types: {}
// })