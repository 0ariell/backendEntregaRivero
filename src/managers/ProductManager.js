const Product = require('../models/product.model');

class ProductManager {
  async getAll() {
    return Product.find().lean();
  }

  async getPaginated(params) {
    const limit = parseInt(params.limit) || 10;
    const page = parseInt(params.page) || 1;
    const sort = params.sort === 'asc' ? 1 : params.sort === 'desc' ? -1 : null;
    const query = params.query;

    const filter = {};
    if (query !== undefined) {
      if (query === 'true' || query === 'false') filter.status = query === 'true';
      else filter.category = query;
    }

    const sortObj = sort ? { price: sort } : {};
    const skip = (page - 1) * limit;

    const [total, products] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter).sort(sortObj).skip(skip).limit(limit).lean(),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;
    const prevPage = page > 1 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null;

    return {
      status: 'success',
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage: prevPage !== null,
      hasNextPage: nextPage !== null,
      prevLink: prevPage
        ? `?page=${prevPage}&limit=${limit}${params.sort ? `&sort=${params.sort}` : ''}${
            params.query ? `&query=${params.query}` : ''
          }`
        : null,
      nextLink: nextPage
        ? `?page=${nextPage}&limit=${limit}${params.sort ? `&sort=${params.sort}` : ''}${
            params.query ? `&query=${params.query}` : ''
          }`
        : null,
    };
  }

  async getById(id) {
    return Product.findById(id).lean();
  }

  async add(data) {
    const prod = await Product.create(data);
    return prod.toObject();
  }

  async update(id, updates) {
    return Product.findByIdAndUpdate(id, updates, { new: true }).lean();
  }

  async delete(id) {
    await Product.findByIdAndDelete(id);
  }
}

module.exports = ProductManager;
