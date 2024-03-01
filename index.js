const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());

/*const apiDir = path.join(__dirname, 'api');
fs.readdirSync(apiDir).forEach(file => {
  if (file.endsWith('.js')) {
    const route = require(path.join(apiDir, file));
    if (route.config && route.config.host) {
      app.use(route.config.host, route.router);
    }
  }
});*/
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
const accountsDir = './accounts';
if (!fs.existsSync(accountsDir)) {
  fs.mkdirSync(accountsDir);
}

const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.listen("8000", () => {
  console.log(`Server running at http://localhost:8000`);
});
