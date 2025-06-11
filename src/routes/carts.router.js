const { Router } = require('express');
const CartManager = require('../managers/CartManager');
const cm = new CartManager();
const router = Router();

router.post('/', async (req, res) => {
  const cart = await cm.create();
  res.status(201).json(cart);
});

router.get('/:cid', async (req, res) => {
  const cart = await cm.get(req.params.cid);
  res.json(cart || { error: 'Carrito no encontrado' });
});

router.post('/:cid/product/:pid', async (req, res) => {
  const cart = await cm.addProduct(req.params.cid, req.params.pid);
  res.json(cart || { error: 'Operación fallida' });
});

router.delete('/:cid/products/:pid', async (req, res) => {
  const cart = await cm.removeProduct(req.params.cid, req.params.pid);
  res.json(cart || { error: 'Operación fallida' });
});

router.put('/:cid', async (req, res) => {
  const cart = await cm.updateProducts(req.params.cid, req.body.products || []);
  res.json(cart || { error: 'Operación fallida' });
});

router.put('/:cid/products/:pid', async (req, res) => {
  const cart = await cm.updateQuantity(
    req.params.cid,
    req.params.pid,
    req.body.quantity
  );
  res.json(cart || { error: 'Operación fallida' });
});

router.delete('/:cid', async (req, res) => {
  const cart = await cm.deleteAll(req.params.cid);
  res.json(cart || { error: 'Operación fallida' });
});

module.exports = router;
