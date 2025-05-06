// index.js (en la raíz)
const app = require("./src/app");
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
