import { Server } from "socket.io";
import {
  getProducts,
  createTable,
  insertProducts,
  createTableMessagge,
  insertMessagge,
} from "./db/index.js";
import { Normalizador } from "./normalizr/normalizr.js";
import { Mensaje } from "./daos/index.js";
let io;
let newProducts = [];
let siguienteID = 1;
let messages = [];

function initSocket(httpServer, PORT) {
  io = new Server(httpServer, { cors: { origin: `http://localhost:${PORT}` } });
  setEvent(io);
}
function setEvent(io) {
  io.on("connection", async (socketClient) => {
    const dataMensajes = await Mensaje.readAll();
    const mensajes = await Normalizador(dataMensajes);
    io.emit("history-message", mensajes);
    console.log("se contecto un nuevo cliente al servidor", socketClient.id);

    socketClient.on("new-products", async (data) => {
      await createTable();
      await insertProducts(data);
      const newProducts = await getProducts();
      io.sockets.emit("add", newProducts);
    });
    socketClient.on("new-message", async (dataChat) => {
      console.log(dataChat)
      await createTableMessagge();
      dataChat.date = new Date().toDateString();
      await Mensaje.createElemt(dataChat);
      io.sockets.emit("notification", dataChat);
    });
    socketClient.on("disconnection", () => {
      console.log("se desconecto del servidor el cliente", socketClient.id);
    });
  });
}

export { initSocket };
