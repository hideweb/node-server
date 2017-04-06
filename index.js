/**
 * Created by zhangfeichao on 2017/3/28.
 */
var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    param = require('./lib/param'),
    path = require('path'),
    mine = param.mineType,
    res,
    req,
    pathV;

/**
 * @param type 错误类型
 * @param err 错误信息
 */
function writeError(type, err) {
    if (type == 404) {
        res.writeHead(type, {
            'Content-Type': 'text/plain'
        });
        res.write("This request URL " + pathV + " was not found on this server.");
        res.end();
    } else if (type == 500) {
        res.writeHead(type, {
            'Content-Type': 'text/plain'
        });
        res.end(err);
    }
}

function readFile(ext) {
    fs.readFile(pathV, "binary", function (err, file) {
        if (!err) {
            var contentType = mine[ext] || "text/plain";
            res.writeHead(200, {
                'Content-Type': contentType
            });
            res.write(file, "binary");
            res.end();
            return false;
        }
        writeError(500, err);
    });
}

function readdir(ext) {
    fs.readdir(pathV, function (err, file) {
        if (!err) {
            var url = (pathV.substr(1) + '/').replace(/(\/\/)/g, "/");
            var list = ['<div><ul>'];
            for (var i = 0; i < file.length; i++) {
                list.push('<li><a href="' + (url + file[i]) + '">' + file[i] + '</a></li>');
            }
            list.push('</ul><div>');
            res.write(list.join(' '), "binary");
            res.end();
            return false;
        }
        writeError(500, err);
    });
}

module.exports = function (obj) {
    var obj = obj || {},
        types = obj.types || {},
        PORT = obj.PORT || param.PORT;
    for (var i in types) mine[i] = types[i];
    var server = http.createServer(function (request, response) {
        var pathname = url.parse(request.url).pathname,
            realPath = '.' + pathname,
            ext = path.extname(realPath);
        ext = ext ? ext.slice(1) : 'unknown';
        req = request;
        res = response;
        pathV = realPath;
        fs.exists(realPath, function (exists) {
            if (!exists) {
                writeError(404);
            } else {
                if (ext !== 'unknown') {
                    readFile(ext);
                } else {
                    readdir(ext);
                }
            }
        });
    });
    server.listen(PORT);
    console.log("Server runing at port: " + PORT + ".");
};