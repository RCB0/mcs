const { spawn } = require('child_process');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = 3000;

const pocketminePath = path.join(__dirname, 'PocketMine-MP');

let serverInfo = {
  ip: null,
  port: null,
  name: null,
};

// Function to start the PocketMine server
function startServer() {
  console.log('Starting PocketMine server...');
  const process = spawn('./start.sh', { cwd: pocketminePath, shell: true });

  process.stdout.on('data', (data) => {
    console.log(`Server stdout: ${data}`);
    io.emit('consoleOutput', data.toString());

    // Extract IP, port, and server name from the output
    const ipMatch = data.toString().match(/Your external IP is (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
    const portMatch = data.toString().match(/Server port \(IPv4\) \((\d+)\)/);
    const nameMatch = data.toString().match(/Give a name to your server \((.+)\):/);

    if (ipMatch) serverInfo.ip = ipMatch[1];
    if (portMatch) serverInfo.port = portMatch[1];
    if (nameMatch) serverInfo.name = nameMatch[1];
  });

  process.stderr.on('data', (data) => {
    console.error(`Server stderr: ${data}`);
    io.emit('
