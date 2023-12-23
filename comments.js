//Create web server 
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var comments = require('./comments');

http.createServer(function (req, res) {
    var query = url.parse(req.url, true).query;
    var pathname = url.parse(req.url, true).pathname;
    if (pathname == '/index.html' || pathname == '/') {
        fs.readFile('index.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
    else if (pathname == '/comments.js') {
        fs.readFile('comments.js', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.write(data);
            res.end();
        });
    }
    else if (pathname == '/comments') {
        if (query['comment'] != undefined) {
            comments.addComment(query['comment']);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(comments.getComments()));
        res.end();
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('Page not found');
        res.end();
    }
}).listen(8080);

console.log('Server running at http://localhost:8080/');

