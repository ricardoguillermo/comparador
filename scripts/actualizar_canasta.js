// scripts/actualizar_canasta.js

const fs = require("fs");

try {
  const data = fs.readFileSync("datos/canasta_sipc_auto10.json", "utf-8");
  fs.writeFileSync("public/canasta.json", data);
  console.log(
    "✅ canasta.json actualizado correctamente desde canasta_sipc_auto10.json"
  );
} catch (error) {
  console.error("❌ Error al actualizar canasta.json:", error.message);
}
