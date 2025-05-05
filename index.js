const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

const dictionaryPath = './dictionary.json';

function getDictionaryData() {
  const data = fs.readFileSync(dictionaryPath, 'utf-8');
  return JSON.parse(data);
}

app.get('/api/check', (req, res) => {
  const word = req.query.kelime;

  if (!word) {
    return res.status(400).json({ error: 'Kelime parametresi eksik!' });
  }

  const dictionary = getDictionaryData();
  const isValidWord = dictionary.includes(word.toLowerCase());

  if (isValidWord) {
    res.json({ message: `${word} geçerli bir kelimedir.` });
  } else {
    res.json({ message: `${word} geçerli bir kelime değildir.` });
  }
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});
