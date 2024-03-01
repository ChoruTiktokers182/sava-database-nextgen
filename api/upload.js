module.exports.config = {
  name: "upload",
  author: "Choru",
  host: "/upload"
};

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  const { name, password, format, file } = req.query;

  // Validate inputs
  if (!name || !password || !format || !file) {
    return res.status(400).send('Name, password, format, and file parameters are required');
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

  // Save file
  const uploadDir = path.join(__dirname, `../uploads/${name}`);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const filePath = path.join(uploadDir, file);
  fs.writeFile(filePath, format, (err) => {
    if (err) {
      return res.status(500).send('Failed to write file');
    }
    res.send('File uploaded successfully');
  });
});


module.exports.router = router;
