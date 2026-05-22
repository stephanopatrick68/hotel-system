require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const documentoRoutes =
require("./routes/documentoRoutes");

const reservaRoutes =
require("./routes/reservaRoutes");

const comprobanteRoutes =
require("./routes/comprobanteRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  express.static(
    path.join(__dirname,"../frontend")
  )
);

app.use("/api",documentoRoutes);

app.use("/api",reservaRoutes);

app.use("/api",comprobanteRoutes);

const PORT = 3000;

app.listen(PORT,()=>{

  console.log(
    `Servidor corriendo en puerto ${PORT}`
  );
});