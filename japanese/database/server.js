const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

const db = new sqlite3.Database('./grammar.db');
// Buscar os pontos gramaticais
app.get('/grammar', (req, res) => {
    db.all("SELECT * FROM grammar_points", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Atualizar o status de 'read'
app.post('/update', (req, res) => {
    const { id, read } = req.body;
    db.run("UPDATE grammar_points SET read = ? WHERE id = ?", [read, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Atualizado com sucesso!" });
    });
});

app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
