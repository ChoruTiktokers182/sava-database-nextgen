module.exports.config = {
  name: "home",
  author: "Choru",
  host: "/"
};

const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
res.send('hi')
});

module.exports.router = router;