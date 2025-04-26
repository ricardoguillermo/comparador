const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/canasta', (req, res) => {
  const data = fs.readFileSync('public/canasta.json', 'utf-8');
  res.json(JSON.parse(data));
});

app.post('/guardar', (req, res) => {
  fs.writeFileSync('public/canasta.json', JSON.stringify(req.body, null, 2));
  res.json({ mensaje: 'Guardado correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
