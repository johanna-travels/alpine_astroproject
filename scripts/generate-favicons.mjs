// Generates all favicon / site-icon assets from public/favicon.svg
// Run with: node scripts/generate-favicons.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'favicon.svg');
const svg = fs.readFileSync(svgPath);

// Cream background used for opaque (iOS/Android) tiles
const CREAM = { r: 245, g: 242, b: 235, alpha: 1 };

function renderPng(size, { flatten = false } = {}) {
  let img = sharp(svg, { density: 768 }).resize(size, size, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  if (flatten) img = img.flatten({ background: CREAM });
  return img.png().toBuffer();
}

// Build a multi-size .ico file from PNG buffers (PNG-compressed ICO entries)
function buildIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const entries = [];
  const datas = [];
  let offset = 6 + count * 16;

  for (const { size, buffer } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // data size
    entry.writeUInt32LE(offset, 12); // data offset
    offset += buffer.length;
    entries.push(entry);
    datas.push(buffer);
  }

  return Buffer.concat([header, ...entries, ...datas]);
}

async function main() {
  // Transparent PNG favicons
  const png16 = await renderPng(16);
  const png32 = await renderPng(32);
  const png48 = await renderPng(48);

  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);

  // Classic .ico fallback (used by search results & legacy browsers)
  const ico = buildIco([
    { size: 16, buffer: png16 },
    { size: 32, buffer: png32 },
    { size: 48, buffer: png48 },
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico);

  // Opaque tiles for iOS home screen + Android/PWA
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), await renderPng(180, { flatten: true }));
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), await renderPng(192, { flatten: true }));
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), await renderPng(512, { flatten: true }));

  console.log('Favicons generated in', publicDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
