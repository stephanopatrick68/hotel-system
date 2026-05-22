const axios = require("axios");

const TOKEN = process.env.FACTILIZA_TOKEN;

const obtenerDatosDocumento = async (numero) => {

  try {
    
    // Soporte para ingreso manual:
    // - "CE:12345678" o "CE-12345678" -> Carnet de extranjería (manual)
    // - "PA:ABC12345" o "PAS:ABC12345" -> Pasaporte (manual)
    // Devuelve objeto con `manual: true` y `nombre: ""` para que el frontend pida los datos al usuario.
    if (
      numero.startsWith("CE:") ||
      numero.startsWith("CE-")
    ) {
      const nro = numero.split(/[:\-]/)[1] || "";
      console.log("Solicitud manual - Carnet de extranjería:", nro);
      return {
        success: true,
        tipo: "CARNET",
        nombre: "",
        manual: true,
        numero: nro
      };
    }

    if (
      numero.startsWith("PA:") ||
      numero.startsWith("PAS:") ||
      numero.startsWith("P:")
    ) {
      const nro = numero.split(/[:\-]/)[1] || "";
      console.log("Solicitud manual - Pasaporte:", nro);
      return {
        success: true,
        tipo: "PASAPORTE",
        nombre: "",
        manual: true,
        numero: nro
      };
    }

    let url = "";
    let tipo = "";

    // DNI
    if (numero.length === 8) {

      tipo = "DNI";

      url = `https://api.factiliza.com/v1/dni/info/${numero}`;

    }

    // RUC
    else if (numero.length === 11) {

      tipo = "RUC";

      url = `https://api.factiliza.com/v1/ruc/info/${numero}`;

    }

    else {

      return {
        success: false,
        message: "Documento inválido"
      };
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    const data = response.data;
    console.log(response.data);

    let nombre = "";

    if (tipo === "DNI") {

      nombre =
        data.data.nombres;
      console.log(nombre);

    } else {

      nombre = data.data.nombre_o_razon_social;
    }

    return {
      success: true,
      tipo,
      nombre,
      data
    };

  } catch (error) {

    console.error(
      error.response?.data || error.message
    );

    return {
      success: false,
      message: "Error consultando documento"
    };
  }
};

module.exports = {
  obtenerDatosDocumento
};