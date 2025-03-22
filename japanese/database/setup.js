const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./grammar.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS grammar_points (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        point TEXT NOT NULL,
        link TEXT NOT NULL,
        source TEXT NOT NULL,
        read TEXT DEFAULT 'NO'
    )`);
});

db.close();
console.log("DB ready!");
