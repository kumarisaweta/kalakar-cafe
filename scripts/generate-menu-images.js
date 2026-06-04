const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../public/images/menu");
fs.mkdirSync(dir, { recursive: true });

const items = [
  "espresso", "cappuccino", "masalachai", "mocha", "kahwa", "kulhad",
  "latte", "lemonchai", "coldbrew", "dalgona", "sandwich", "pasta",
  "maggi", "samosa", "garlicbread", "fries", "brownie", "cheesecake",
  "gulabjamun", "waffle",
];
const colors = ["#A0522D", "#D2691E", "#808000", "#6B4423"];

items.forEach((name, i) => {
  const c = colors[i % 4];
  const label = name.charAt(0).toUpperCase() + name.slice(1);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFF4E6"/><stop offset="100%" stop-color="${c}" stop-opacity="0.35"/></linearGradient></defs><rect width="400" height="400" fill="url(#g)"/><circle cx="200" cy="170" r="70" fill="${c}" opacity="0.2"/><text x="200" y="320" text-anchor="middle" font-family="Georgia,serif" font-size="26" fill="${c}">${label}</text></svg>`;
  fs.writeFileSync(path.join(dir, `${name}.svg`), svg);
});

console.log(`Created ${items.length} menu images`);
