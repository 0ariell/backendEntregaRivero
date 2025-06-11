const socket = io();
const list = document.getElementById('prodList');

socket.on('products', data => {
  list.innerHTML = '';
  data.payload.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `${p.title} - $${p.price} <button data-id="${p._id}" class="delete">Eliminar</button>`;
    list.appendChild(li);
  });
});

document.getElementById('addForm').addEventListener('submit', e => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const obj = Object.fromEntries(fd.entries());
  socket.emit('addProduct', obj);
  e.target.reset();
});

list.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    const id = e.target.dataset.id;
    socket.emit('deleteProduct', id);
  }
});
