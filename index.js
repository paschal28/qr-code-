import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

// Step 1: Use the inquirer npm package to get user input
inquirer.prompt([
  {
    type: 'input',
    name: 'url',
    message: 'Enter a URL to generate a QR code:'
  }
]).then(answers => {
  const url = answers.url;

  // Step 2: Use the qr-image npm package to turn the user entered URL into a QR code image
  const qrSvg = qr.image(url, { type: 'png' });
  qrSvg.pipe(fs.createWriteStream('qr-code.png'));

  // Step 3: Create a txt file to save the user input using the native fs node module
  fs.writeFile('user-input.txt', url, err => {
    if (err) throw err;
    console.log('The URL has been saved to user-input.txt');
  });

  console.log('QR code generated and saved as qr-code.png');
});

