module.exports.config = {
  name: "login",
  author: "Choru",
  host: "/login"
};

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();


router.get('/', (req, res) => {
  const { name, password } = req.query;

  // Validate inputs
  if (!name || !password) {
    return res.status(400).send('Name and password are required');
  }

  // Check account exists
  const accountPath = path.join(__dirname, `../accounts/${name}.json`);
  if (!fs.existsSync(accountPath)) {
    return res.status(400).send('Account does not exist');
  }

  // Check password
  const accountData = JSON.parse(fs.readFileSync(accountPath));
  if (accountData.password !== password) {
    return res.status(401).send('Incorrect password');
  }

  res.send('Login successful');
});

module.exports.router = router;
