const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

const dictionaryPath = './dictionary.txt';  
function getDictionaryData() {
  const data = fs.readFileSync(dictionaryPath, 'utf-8');
  // Satırları ayırıyoruz, boşlukları temizliyoruz ve kelimeleri bir diziye çeviriyoruz
  return data.split('\n').map(word => word.trim().toLowerCase());
}

app.get('/api/check', (req, res) => {
  const word = req.query.kelime;

  if (!word) {
    return res.status(400).json({ error: 'Kelime parametresi eksik!' });
  }

  const dictionary = getDictionaryData();
  const isValidWord = dictionary.includes(word.toLowerCase());

  res.json({ valid: isValidWord });  
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});
