const axios = require("axios");

const obtenerXML = async(urlXML)=>{

  try{

    const response = await axios.get(urlXML);

    return response.data;

  }catch(error){

    console.error(error);

    return null;
  }
};

module.exports = {
  obtenerXML
};