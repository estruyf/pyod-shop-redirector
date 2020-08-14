// @ts-check

const fs = require('fs');
const path = require('path');

/**
 * Add leading zeros
 * @param {*} num 
 * @param {*} size 
 */
const pad = (num, size) => {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

/**
  {
    "id": "dev-ops",
    "name": "dev-ops",
    "price": 2.00,
    "image": "/images/dev-ops.jpg",
    "description": "DevOps",
    "url": "https://pimpyourowndevice.com",
    "inStock": true,
    "type": "holographic",
    "dimensions": "8,9 x 3,0 cm"
  }
 */
const stickersTxt = fs.readFileSync(path.join(__dirname, `../stickers.json`), { encoding: "utf8"} );
if (stickersTxt) {
  const stickers = JSON.parse(stickersTxt);
  for (const sticker of stickers) {
    console.log(`- ${sticker.name}: amount - ${sticker.amount} / sold - ${sticker.sold}`)
    const folderName = `${pad(sticker.id, 3)}`;
    const folderDir = path.join(__dirname, `../content/${folderName}`);
    if (!fs.existsSync(folderDir)) {
      fs.mkdirSync(folderDir);
    }

    let categories = [];
    if (sticker.category) {
      for (const category of sticker.category) {
        categories.push(`- ${category}`);
      }
    }

    const stickerPage = `---
id: ${sticker.id}
title: "${sticker.name}"
description: "${sticker.description}"
draft: false
community: ${sticker.community}
type: stickers
slug: "${folderName}"
---
`;

    fs.writeFileSync(path.join(folderDir, `index.md`), stickerPage, { encoding: "utf8" });
  }
}