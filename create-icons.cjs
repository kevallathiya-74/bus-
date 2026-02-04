const fs = require('fs');
const path = require('path');

// Create a simple colored square as icon placeholder
function createPNGIcon(size) {
  // PNG header for a simple red square
  const canvas = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#E8451E"/>
    <text x="50%" y="50%" font-size="${size/6}" fill="white" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-weight="bold">R</text>
  </svg>`;
  return canvas;
}

// Create SVG icons that will work as placeholders
const icon192 = createPNGIcon(192);
const icon512 = createPNGIcon(512);

fs.writeFileSync(path.join(__dirname, 'public', 'icon-192.svg'), icon192);
fs.writeFileSync(path.join(__dirname, 'public', 'icon-512.svg'), icon512);

console.log('✅ SVG icons created');
console.log('⚠️  For production, convert these to PNG using:');
console.log('   npm install -g svgexport');
console.log('   svgexport public/icon-192.svg public/icon-192.png 192:192');
console.log('   svgexport public/icon-512.svg public/icon-512.png 512:512');
