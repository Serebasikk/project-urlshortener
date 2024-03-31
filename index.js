require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const dns = require('dns');
const URL = require('url');
const fs = require('fs');


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', function (req, res) {
  const { url } = req.body;
  const urlList = require('./url.json');

  const obj = urlList.find((e) => e.original_url === url);

  if (obj) return res.json(obj);

  const { hostname } = URL.parse(url);
  if (!hostname) return res.json({ error: 'invalid url' });
  dns.lookup(hostname, (err, address, family) => {
    if (err) {
      console.error(err);
      return res.json({ error: 'invalid url' });
    }
    console.log('IP адреса:', address);
    console.log('Версія протоколу IP:', family);
  });

  const next = urlList.length > 0 ?
    urlList.reduce((e, i) => Math.max(e.short_url || 0, i.short_url), 0) + 1 : 1;

  const result = {
    original_url: url,
    short_url: next
  }

  urlList.push(result);

  const json = JSON.stringify(urlList, null, 2);

  fs.writeFile('url.json', json, (err) => {
    if (err) {
      console.error('Помилка при збереженні файлу:', err);
      return;
    }
    console.log('Файл успішно збережено!');
  });

  return res.json(result);

});

app.get('/api/shorturl/:short_url', function (req, res) {
  const { short_url } = req.params;
  const urlList = require('./url.json');

  const obj = urlList.find((e) => e.short_url == short_url);

  if (!obj) return res.json({ error: "No short URL found for the given input" });
  res.redirect(obj.original_url);
});


app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
