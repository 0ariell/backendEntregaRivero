const { Router } = require('express');
const ProductManager = require('../managers/ProductManager');
const pm = new ProductManager();
const router = Router();

router.get('/', async (req, res) => {
  const result = await pm.getPaginated(req.query);
  res.json(result);
});

router.get('/:pid', async (req, res) => {
  const p = await pm.getById(req.params.pid);
  if (!p) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(p);
});

router.post('/', async (req, res) => {
  const newP = await pm.add(req.body);
  const io = req.app.get('io');
  if (io) io.emit('products', await pm.getPaginated({}));
  res.status(201).json(newP);
});

router.put('/:pid', async (req, res) => {
  const updated = await pm.update(req.params.pid, req.body);
  if (!updated) return res.status(404).json({ error: 'No se pudo actualizar' });
  const io = req.app.get('io');
  if (io) io.emit('products', await pm.getPaginated({}));
  res.json(updated);
});

router.delete('/:pid', async (req, res) => {
  await pm.delete(req.params.pid);
  const io = req.app.get('io');
  if (io) io.emit('products', await pm.getPaginated({}));
  res.json({ status: 'Producto eliminado' });
});

module.exports = router;
