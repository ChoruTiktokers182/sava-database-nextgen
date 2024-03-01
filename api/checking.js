// Assuming this route is in api/files.js

module.exports.config = {
  name: "files",
  author: "Choru",
  host: "/files"
};

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  const { name, password } = req.query;

  // Validate inputs
  if (!name || !password) {
    return res.status(400).send('Name and password parameters are required');
  }

  // Check if user directory exists
  const uploadDir = path.join(__dirname, `../uploads/${name}`);
  if (!fs.existsSync(uploadDir)) {
    return res.status(404).send('User folder not found');
  }

  // Check password
  const accountPath = path.join(__dirname, `../accounts/${name}.json`);
  if (!fs.existsSync(accountPath)) {
    return res.status(404).send('Account not found');
  }

  const accountData = JSON.parse(fs.readFileSync(accountPath));
  if (accountData.password !== password) {
    return res.status(401).send('Incorrect password');
  }

  // Read files in user directory
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).send('Failed to read user files');
    }

    res.send(files);
  });
});

module.exports.router = router;
