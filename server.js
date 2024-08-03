const { exec } = require('child_process');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = 3000;
const startScriptPath = path.resolve(__dirname, 'start.sh');

let serverInfo = {
  ip: '52.187.56.190',
  port: 'IPv4:19132 , IPv6:70707',
  name: 'rcb0',
};

function startServer() {
  console.log('Starting PocketMine server...');
  const process = exec(startScriptPath);

  process.stdout.on('data', (data) => {
    console.log(`Server stdout: ${data}`);
    io.emit('consoleOutput', data.toString());

    // Extract IP, port, and server name
    const ipMatch = data.toString().match(/Your external IP is (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
    const portMatch = data.toString().match(/Server port \(IPv4\) \((\d+)\)/);
    const nameMatch = data.toString().match(/Give a name to your server \(([^)]+)\):/);

    if (ipMatch) serverInfo.ip = ipMatch[1];
    if (portMatch) serverInfo.port = portMatch[1];
    if (nameMatch) serverInfo.name = nameMatch[1];
  });

  process.stderr.on('data', (data) => {
    console.error(`Server stderr: ${data}`);
    io.emit('consoleOutput', data.toString());
  });

  process.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
    io.emit('consoleOutput', `Server process exited with code ${code}`);
  });
}

startServer();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/info', (req, res) => {
  res.json(serverInfo);
});

server.listen(port, () => {
  console.log(`Server info available at http://localhost:${port}`);
});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('A client connected');
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});
