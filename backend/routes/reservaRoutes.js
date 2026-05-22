const express = require("express");

const router = express.Router();

router.post("/reserva",(req,res)=>{

  console.log("DATOS RECIBIDOS:");

  console.log(req.body);

  res.json({
    success:true,
    message:"Reserva recibida"
  });
});

module.exports = router;