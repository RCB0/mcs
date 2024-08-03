const express = require('express');
const { exec } = require('child_process');
const app = express();
const config = require('./config.json');

// Load configuration
const mcpeConfig = config.mcpe;
const webPort = config.web.port;

// Serve basic info
app.get('/', (req, res) => {
  res.send(`MCPE Server: ${mcpeConfig.serverName}<br>IP: ${mcpeConfig.ip}<br>Port: ${mcpeConfig.port}`);
});

// Endpoint to start the MCPE server
app.post('/start-server', (req, res) => {
  exec('./start.sh', { cwd: __dirname }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting server: ${error}`);
      res.status(500).send('Failed to start MCPE server.');
      return;
    }
    console.log(`Server started: ${stdout}`);
    res.send('MCPE server started.');
  });
});

// Endpoint to stop the MCPE server
app.post('/stop-server', (req, res) => {
  exec('pkill -f PocketMine-MP.phar', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error stopping server: ${error}`);
      res.status(500).send('Failed to stop MCPE server.');
      return;
    }
    console.log(`Server stopped: ${stdout}`);
    res.send('MCPE server stopped.');
  });
});

// Endpoint to get server status
app.get('/status', (req, res) => {
  // Implement status check logic if needed
  res.send('MCPE server is running.');
});

app.listen(webPort, () => {
  console.log(`Node.js server running on http://localhost:${webPort}`);
});
