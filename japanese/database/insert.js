const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./grammar.db');

const dojg = require("./batches/dojg");
const hjg = require("./batches/hjg");
const donnatoki = require("./batches/donnatoki");
const bunpro = require("./batches/bunpro");
const nihongokyoshi = require("./batches/nihongokyoshi");
const imabi = require("./batches/imabi");
const maggie = require("./batches/maggie");

const dados = [...dojg, ...hjg, ...donnatoki, ...bunpro, ...nihongokyoshi, ...imabi, ...maggie].map(item => [...item, "NO"]); 

const stmt = db.prepare("INSERT INTO grammar_points (point, link, source, read) VALUES (?, ?, ?, ?)");
dados.forEach(d => stmt.run(d));
stmt.finalize();

db.close();
console.log("Dados inseridos!");
