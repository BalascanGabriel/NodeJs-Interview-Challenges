const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Hello World ! ');
        }
        else if (req.url === '/custom') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Custom Endpoint ! :)');
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found !');
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method now allowed !!!');
    }

});

const port = 3000;

server.listen(port, () => {
    console.log(`Server listening on port ${port}....`);
});