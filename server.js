const { exec } = require('child_process');

// Example endpoint to start the MCPE server
app.post('/start-server', (req, res) => {
  exec('php PocketMine-MP.phar', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting server: ${error}`);
      res.status(500).send('Failed to start MCPE server.');
      return;
    }
    console.log(`Server started: ${stdout}`);
    res.send('MCPE server started.');
  });
});

// Example endpoint to stop the MCPE server
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
