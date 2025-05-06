const { Router } = require("express");
const ProductManager = require("../managers/ProductManager");
const pm = new ProductManager();
const router = Router();

// GET /api/products/
router.get("/", async (req, res) => {
  res.json(await pm.getAll());
});

// GET /api/products/:pid
router.get("/:pid", async (req, res) => {
  const p = await pm.getById(req.params.pid);
  res.json(p || { error: "Producto no encontrado" });
});

// POST /api/products/
router.post("/", async (req, res) => {
  const newP = await pm.add(req.body);
  res.status(201).json(newP);
});

// PUT /api/products/:pid
router.put("/:pid", async (req, res) => {
  const updated = await pm.update(req.params.pid, req.body);
  res.json(updated || { error: "No se pudo actualizar" });
});

// DELETE /api/products/:pid
router.delete("/:pid", async (req, res) => {
  await pm.delete(req.params.pid);
  res.json({ status: "Producto eliminado" });
});

module.exports = router;
