module.exports.config = {
  name: "download",
  author: "Choru",
  host: "/download"
};

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  const { name, password, file } = req.query;

  // Validate inputs
  if (!name || !password || !file) {
    return res.status(400).send('Name, password, and file parameters are required');
  }

  // Check authenticated user
  const accountPath = path.join(__dirname, `../accounts/${name}.json`);
  if (!fs.existsSync(accountPath)) {
    return res.status(400).send('Account does not exist');
  }

  // Check password
  const accountData = JSON.parse(fs.readFileSync(accountPath));
  if (accountData.password !== password) {
    return res.status(401).send('Incorrect password');
  }

  // Check file exists
  const uploadDir = path.join(__dirname, `../uploads/${name}`);
  const filePath = path.join(uploadDir, file);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  res.download(filePath);
});

module.exports.router = router;
