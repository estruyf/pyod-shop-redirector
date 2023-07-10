const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv').config();

(async () => {
  const url = process.env.FUNCTION_URL;

  const data = await fetch(url, {
    headers: {
      "Accept": "application/json"
    }
  });
  if (data && data.ok) {
    const stickers = await data.json();
    if (stickers) {
      fs.writeFileSync(path.join(__dirname, "../stickers.json"), JSON.stringify(stickers, null, 2), {
        encoding: "utf8"
      });
    }
  }
})();