import express from "express";

import multer from "multer";

const { Router } = express;

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/productos", upload.single("thumbnail"), (req, res, next) => {
  const { file } = req;
  if (!file) {
    const error = new Error("Archivo no encontrado.");
    error.httpStatusCode = 400;
    return next();
  }
  res.send(file);
});

export default router;
