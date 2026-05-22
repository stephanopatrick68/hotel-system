const {
    obtenerDatosDocumento
  } = require("../services/documentoService");
  
  const consultarDocumento = async (req, res) => {
  
    try{
  
      const numero = req.params.numero;
  
      const data = await obtenerDatosDocumento(numero);
  
      res.json(data);
  
    }catch(error){
  
      console.error(error);
  
      res.status(500).json({
        success:false,
        message:"Error interno"
      });
    }
  };
  
  module.exports = {
    consultarDocumento
  };