const fs = require("fs").promises;
const path = require("path");

class CartManager {
  constructor() {
    this.file = path.join(__dirname, "../data/cart.json");
  }

  async _read() {
    const txt = await fs.readFile(this.file, "utf-8");
    return JSON.parse(txt || "[]");
  }

  async _write(data) {
    await fs.writeFile(this.file, JSON.stringify(data, null, 2));
  }

  async create() {
    const carts = await this._read();
    const id = carts.length ? carts[carts.length - 1].id + 1 : 1;
    const newCart = { id, products: [] };
    carts.push(newCart);
    await this._write(carts);
    return newCart;
  }

  async get(id) {
    return (await this._read()).find((c) => c.id == id);
  }

  async addProduct(cid, pid) {
    const carts = await this._read();
    const cart = carts.find((c) => c.id == cid);
    if (!cart) return null;
    const item = cart.products.find((p) => p.product == pid);
    if (item) item.quantity++;
    else cart.products.push({ product: pid, quantity: 1 });
    await this._write(carts);
    return cart;
  }
}

module.exports = CartManager;
