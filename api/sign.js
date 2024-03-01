module.exports.config = {
  name: "sign",
  author: "Choru",
  host: "/sign"
};

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();



router.get('/', (req, res) => {
  const { name, email, password, confirmPassword } = req.query;

  // Validate inputs
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).send('All fields are required');
  }

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  // Save account data
  const accountPath = path.join(__dirname, `../accounts/${name}.json`);
  if (fs.existsSync(accountPath)) {
    return res.status(400).send('Account already exists');
  }

  const accountData = { name, email, password };
  fs.writeFileSync(accountPath, JSON.stringify(accountData));

  // Create upload folder
  const uploadDir = path.join(__dirname, `../uploads/${name}`);
  fs.mkdirSync(uploadDir);

  res.send('Account created successfully');
});

module.exports.router = router;
