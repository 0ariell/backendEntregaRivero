const Cart = require('../models/cart.model');

class CartManager {
  async create() {
    const cart = await Cart.create({ products: [] });
    return cart.toObject();
  }

  async get(id) {
    return Cart.findById(id).populate('products.product').lean();
  }

  async addProduct(cid, pid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;
    const item = cart.products.find((p) => p.product.toString() === pid);
    if (item) item.quantity++;
    else cart.products.push({ product: pid, quantity: 1 });
    await cart.save();
    return cart.populate('products.product');
  }

  async removeProduct(cid, pid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;
    cart.products = cart.products.filter((p) => p.product.toString() !== pid);
    await cart.save();
    return cart.populate('products.product');
  }

  async updateProducts(cid, products) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;
    cart.products = products;
    await cart.save();
    return cart.populate('products.product');
  }

  async updateQuantity(cid, pid, qty) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;
    const item = cart.products.find((p) => p.product.toString() === pid);
    if (!item) return null;
    item.quantity = qty;
    await cart.save();
    return cart.populate('products.product');
  }

  async deleteAll(cid) {
    const cart = await Cart.findById(cid);
    if (!cart) return null;
    cart.products = [];
    await cart.save();
    return cart.populate('products.product');
  }
}

module.exports = CartManager;
