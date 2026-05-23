const obtenerFechaPeru = ()=>{

    return new Date()
    .toLocaleDateString(
  
      "en-CA",
  
      {
        timeZone:
        "America/Lima"
      }
    );
  };
  
  module.exports = {
    obtenerFechaPeru
  };