const app = require('./src/app');
const connectDB = require('./src/db');
const ProductManager = require('./src/managers/ProductManager');

const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

const { Server } = require('socket.io');
const io = new Server(httpServer);
app.set('io', io);

const pm = new ProductManager();
connectDB();

io.on('connection', async (socket) => {
  socket.emit('products', await pm.getPaginated({}));

  socket.on('addProduct', async (data) => {
    await pm.add(data);
    io.emit('products', await pm.getPaginated({}));
  });

  socket.on('deleteProduct', async (id) => {
    await pm.delete(id);
    io.emit('products', await pm.getPaginated({}));
  });
});
