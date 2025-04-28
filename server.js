// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

// Ruta para obtener la canasta
app.get("/canasta", (req, res) => {
  const dataPath = path.join(__dirname, "public", "canasta.json");
  const data = fs.readFileSync(dataPath, "utf-8");
  res.json(JSON.parse(data));
});

// Ruta para guardar cambios en la canasta
app.post("/guardar", (req, res) => {
  const dataPath = path.join(__dirname, "public", "canasta.json");
  fs.writeFileSync(dataPath, JSON.stringify(req.body, null, 2));
  res.json({ mensaje: "✅ Guardado correctamente" });
});

const comentariosPath = path.join(__dirname, "public", "comentarios.json");

// Ruta para recibir comentarios
app.post("/enviar-comentario", (req, res) => {
  const { nombre, email, comentario } = req.body;

  let comentarios = [];
  if (fs.existsSync(comentariosPath)) {
    comentarios = JSON.parse(fs.readFileSync(comentariosPath, "utf-8"));
  }

  comentarios.push({
    nombre,
    email,
    comentario,
    fecha: new Date().toISOString(),
  });

  fs.writeFileSync(comentariosPath, JSON.stringify(comentarios, null, 2));
  res.json({ mensaje: "Comentario recibido" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
