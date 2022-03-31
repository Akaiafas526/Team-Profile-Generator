// Removes the team.html file from the dist/ folder.

const fs = require('fs');
if (fs.existsSync('./dist/team.html')) {
  fs.unlinkSync('./dist/team.html');
  console.log('/dist/ folder reset!');
}
