const { exec } = require('child_process');

exec('bash start.sh', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing start.sh: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
//node update