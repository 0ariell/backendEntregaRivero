const { Router } = require("express");
const CartManager = require("../managers/CartManager");
const cm = new CartManager();
const router = Router();

// POST /api/carts/
router.post("/", async (req, res) => {
  const cart = await cm.create();
  res.status(201).json(cart);
});

// GET /api/carts/:cid
router.get("/:cid", async (req, res) => {
  const cart = await cm.get(req.params.cid);
  res.json(cart || { error: "Carrito no encontrado" });
});

// POST /api/carts/:cid/product/:pid
router.post("/:cid/product/:pid", async (req, res) => {
  const cart = await cm.addProduct(+req.params.cid, +req.params.pid);
  res.json(cart || { error: "Operación fallida" });
});

module.exports = router;
