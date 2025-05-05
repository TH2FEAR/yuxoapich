const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const dictionaryPath = path.join(__dirname, 'dictionary.txt');

function getDictionaryData() {
  const data = fs.readFileSync(dictionaryPath, 'utf-8');
  return data.split('\n').map(k => k.trim().toLowerCase()).filter(Boolean);
}

app.get('/api/check', (req, res) => {
  const word = req.query.kelime;
  if (!word) return res.status(400).send('kelime yok amk');

  const dictionary = getDictionaryData();
  const isValid = dictionary.includes(word.toLowerCase());

  res.send(isValid.toString()); // sadece true ya da false
});

module.exports = app;
