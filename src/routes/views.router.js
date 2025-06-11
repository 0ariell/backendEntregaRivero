const { Router } = require('express');
const ProductManager = require('../managers/ProductManager');
const CartManager = require('../managers/CartManager');

const router = Router();
const pm = new ProductManager();
const cm = new CartManager();

router.get('/', (req, res) => {
  res.redirect('/products');
});

router.get('/products', async (req, res) => {
  const data = await pm.getPaginated(req.query);
  res.render('index', { ...data, products: data.payload, cartId: req.query.cartId || '1' });
});

router.get('/products/:pid', async (req, res) => {
  const product = await pm.getById(req.params.pid);
  if (!product) return res.status(404).render('notfound');
  res.render('product', { product });
});

router.get('/carts/:cid', async (req, res) => {
  const cart = await cm.get(req.params.cid);
  if (!cart) return res.status(404).render('notfound');
  res.render('cart', { cart });
});

router.get('/realtimeproducts', async (req, res) => {
  const data = await pm.getPaginated({});
  res.render('realTimeProducts', { products: data.payload });
});

module.exports = router;
