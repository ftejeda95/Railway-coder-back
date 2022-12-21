import express from "express";
const { Router } = express;
import {createTable,insertProducts,getProducts,createTableMessagge,insertMessagge,getMessagge,getProdutsTest} from "../db/index.js";
const router = Router(Router);


const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
};

let productos = [
  {
    id: 1,
    title: "pila",
    price: "400",
    thumbnail: "",
  },
  {
    id: 2,
    title: "lampara",
    price: "500",
    thumbnail: "",
  },
  {
    id: 3,
    title: "martillo",
    price: "300",
    thumbnail: "",
  },
];

let siguienteID = productos.length;

router.get("/productos", async (_, res) => {
  const productosDb = await getProducts();
  res.status(STATUS_CODE.OK).json(productosDb);
});

//  function id(idProducto) {
//   const productoID =  productos.find(prod=> prod.id == idProducto )
//   return(productoID)
//  }
// router.get("/productos/:id", async (req, res) => {
//   const idProducto = req.params.id;
//   try {
//     const productID = await getProductsId(idProducto);
//     res.status(STATUS_CODE.OK).json(productID);
//   } catch (error) {
//     console.log(error.message);
//     res.json({ error: "producto no encontrado" }).end();
//   }
// });

router.post("/productos", (req, res) => {
  let { body: data } = req;
  data = { id: siguienteID, ...data };
  productos.push(data);
  siguienteID++;
  logger.info(`Ruta ${req.originalUrl} metodo GET`)
  res.status(STATUS_CODE.OK).json(data);
});

function actualizarProd(idProducto, data) {
  const elementIndex = productos.findIndex((obj) => obj.id == idProducto);
  productos[elementIndex].title = data.title;
  productos[elementIndex].price = data.price;
  productos[elementIndex].thumbnail = data.thumbnail;
}

router.put("/productos/:id", async (req, res) => {
  const idProducto = req.params.id;
  const data = req.body;
  try {
    await actualizarProd(idProducto, data);
    logger.info(`Ruta ${req.originalUrl} metodo GET`)
    res.status(STATUS_CODE.NO_CONTENT).end();
  } catch (error) {
    logger.error(error.message);
    res.json({ error: "producto no encontrado" }).end();
  }
});

function deleteProd(idProducto) {
  const elementIndex = productos.findIndex((obj) => obj.id == idProducto);
  return productos.splice(elementIndex, 1);
}

router.delete("/productos/:id", async (req, res) => {
  const idProducto = req.params.id;
  try {
    await deleteProd(idProducto);
    logger.info(`Ruta ${req.originalUrl} metodo GET`)
    res.status(STATUS_CODE.NO_CONTENT).end();
  } catch (error) {
    logger.error(error.message);
    res.json({ error: "producto no encontrado" }).end();
  }
});

router.get("/", function (req, res, next) {
  res.render("index", { productos, isEmpty: !productos.length });
});

router.post("/productos", async function (req, res, next) {
  await productos.push(req.body);
  await console.log(productos[0].title);
  logger.info(`Ruta ${req.originalUrl} metodo GET`)
  await res.render("tabla", { productos, isEmpty: !productos.length });
});

export default router;
