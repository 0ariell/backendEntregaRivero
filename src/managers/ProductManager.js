const fs = require("fs").promises;
const path = require("path");

class ProductManager {
  constructor() {
    this.file = path.join(__dirname, "../data/products.json");
  }

  async _read() {
    const txt = await fs.readFile(this.file, "utf-8");
    return JSON.parse(txt || "[]");
  }

  async _write(data) {
    await fs.writeFile(this.file, JSON.stringify(data, null, 2));
  }

  async getAll() {
    return this._read();
  }

  async getById(id) {
    return (await this._read()).find((p) => p.id == id);
  }

  async add(product) {
    const items = await this._read();
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const newProd = { id, ...product };
    items.push(newProd);
    await this._write(items);
    return newProd;
  }

  async update(id, updates) {
    const items = await this._read();
    const idx = items.findIndex((p) => p.id == id);
    if (idx < 0) return null;
    items[idx] = { ...items[idx], ...updates, id };
    await this._write(items);
    return items[idx];
  }

  async delete(id) {
    const items = (await this._read()).filter((p) => p.id != id);
    await this._write(items);
  }
}

module.exports = ProductManager;
