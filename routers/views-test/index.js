import { query } from "express";
import express from "express";
const router = express.Router();
import {getProdutsTest} from "../../db/index.js";

router.get("/product-test/", async function (req, res, next) {
  let products = await getProdutsTest();
  console.log(products);
  res.render("tabla", {
    products,
    isEmpty: !products.length,
    tieneImg: !products.thumbnail,
  });
});

export default router;
