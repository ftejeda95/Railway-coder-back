const formProducts = document.getElementById("form-products");
const inputTitle = document.getElementById("input-title");
const inputPrice = document.getElementById("input-price");
const inputThumbnail = document.getElementById("input-thumbnail");
const tableProducts = document.getElementById("show-products");
// SOCKET PRODUCTOS
let newProducts = [];

const socket = io();

function showProducts(data) {
  const tr = document.createElement("tr");
  data.forEach((element) => {
    tr.innerHTML = `<td>${element.id}</td> <td>${element.title}</td> <td>${element.price}</td>  <td><img src=${element.thumbnail} alt=${element.title} width="50px"></td>`;
    tableProducts.appendChild(tr);
  });
}

formProducts.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    title: inputTitle.value,
    price: inputPrice.value,
    thumbnail: inputThumbnail.value,
  };
  socket.emit("new-products", data);
});

socket.on("add", (newProducts) => {
  showProducts(newProducts);
});

//SOCKET CHAT

const tilte = document.getElementById("title");
const formMessage = document.getElementById("form-message");
const inputNombre = document.getElementById("input-nombre");
const inputApellido = document.getElementById("input-apellido");
const inputEdad = document.getElementById("input-edad");
const inputAlias = document.getElementById("input-alias");
const inputAvatar = document.getElementById("input-avatar");
const inputEmail = document.getElementById("input-email");
const inputMessage = document.getElementById("input-message");
const listMessages = document.getElementById("list-messages");

let messages = [];

const dataMensaje = () => {
  const data1 = {
    author: {
      email: inputEmail.value,
      nombre: inputNombre.value,
      apellido: inputApellido.value,
      edad: inputEdad.value,
      alias: inputAlias.value,
      avatar: inputAvatar.value,
    },
    text: inputMessage.value,
    date: new Date().toLocaleString(),
  };
  return data1;
};

function htmlList(mensajes) {
  mensajes.forEach((mensaje) => {
    const li = document.createElement("li");
    li.innerHTML = `<li style="color:green;"><img src="${mensaje.author.avatar}" width="50"><strong style="color:blue;">${mensaje.author.email}</strong>--<span style="color:red;">${mensaje.date}</span>: ${mensaje.text}</li>`;
    listMessages.appendChild(li);
  });
}
formMessage.addEventListener("submit", (event) => {
  event.preventDefault();
  let dataChat = dataMensaje();
  socket.emit("new-message", dataChat);
  inputMessage.value = "";
  inputMessage.focus();
});

socket.on('connection', () => {
  console.log('Conectados al servidor');
});

socket.on("history-message", (data) => {
  /* se desnormaliza la informacion */
  const autorScheme = new normalizr.schema.Entity(
    "author",
    {},
    { idAttribute: "email" }
  );

  const mensajeScheme = new normalizr.schema.Entity("mensaje", {
    author: autorScheme,
  });
  const mensajeTotla = new normalizr.schema.Entity("mensaje", {
    mensaje: [mensajeScheme],
  });
  const dataReversed = normalizr.denormalize(
    data.result,
    mensajeTotla,
    data.entities
  );
  console.log("esto es Data", dataReversed);
  // cuanto pesa la orginial
  const originalSize = JSON.stringify(dataReversed).length;
  const normalizedSize = JSON.stringify(data).length;
  const resultSata = (normalizedSize * 100) / originalSize;
  let totalTotal = resultSata.toFixed(2);

  console.log("Data normalizada", data, normalizedSize);

  console.log(
    "--------------------------------------------------------------------"
  );

  console.log("Data Desnormalizada", dataReversed, originalSize);

  console.log(`Porcentaje de compresion: ${totalTotal}%`);
  tilte.innerText = `Porcentaje de compresion: ${totalTotal}%`;
  listMessages.innerText = '';
  htmlList(dataReversed.mensaje);
});

socket.on("notification", (data) => {

  const li = document.createElement("li");
  let mensaje = data
  li.innerHTML = `<li style="color:green;"><img src="${mensaje.author.avatar}" width="50"><strong style="color:blue;">${mensaje.author.email}</strong>--<span style="color:red;">${mensaje.date}</span>: ${mensaje.text}</li>`
  listMessages.appendChild(li);

});
