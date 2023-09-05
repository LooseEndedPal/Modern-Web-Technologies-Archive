const http = require('http')

const server = http.createServer((req,res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Welcome to Fitness Tracker');
})

const PORT = 3000;

server.listen(PORT,() => {
    console.log('Server Running  on <http://localhost>:${PORT}');
})