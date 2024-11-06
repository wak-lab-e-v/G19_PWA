const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

const options = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'localhost.key')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'localhost.crt'))
};

app.use(express.static(path.join(__dirname)));

https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS Server läuft unter https://localhost:${PORT}`);
});
