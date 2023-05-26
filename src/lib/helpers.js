const fs = require("fs");

exports.chunkArray = function chunkArray(myArray, chunk_size) {
  const results = [];
  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }
  return results;
};

exports.readJSON = (fname) => JSON.parse(fs.readFileSync(fname, "utf8"));

exports.writeJSON = (fname, obj) =>
  fs.writeFileSync(fname, JSON.stringify(obj, null, "  "));

/* eslint no-console: ["off"] */
exports.log = console.log.bind(console);
exports.error = console.error.bind(console);
