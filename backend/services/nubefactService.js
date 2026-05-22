const axios = require("axios");

const path = require("path");

const NUBEFACT_URL =
  process.env.NUBEFACT_URL;

const NUBEFACT_TOKEN =
  process.env.NUBEFACT_TOKEN;

const {
  obtenerSiguienteNumero
}
  =
  require("../services/serieService");

const enviarComprobante = async (data) => {

  try {

    const serie =

      data.documento.length === 11
        ? "FFF1"
        : "BBB1";

    const numero =

      await obtenerSiguienteNumero(
        serie
      );
      
    const payload = {

      operacion: "generar_comprobante",

      tipo_de_comprobante:
        data.documento.length === 11 ? "1" : "2",

      serie:
        serie,

      numero: numero,

      sunat_transaction: "1",

      cliente_tipo_de_documento:
        data.documento.length === 11 ? "6" : "1",

      cliente_numero_de_documento:
        data.documento,

      cliente_denominacion:
        data.nombre,

      cliente_direccion: "HUANCAYO",

      fecha_de_emision:
        new Date().toISOString().split("T")[0],

      moneda: "1",

      porcentaje_de_igv: "18.00",

      total_gravada:
        Number(data.monto) / 1.18,

      total_igv:
        Number(data.monto) -
        (Number(data.monto) / 1.18),

      total:
        Number(data.monto),

      enviar_automaticamente_a_la_sunat: true,

      enviar_automaticamente_al_cliente: false,

      items: [

        {

          unidad_de_medida: "ZZ",

          codigo: "HAB001",

          descripcion:
            `Habitación ${data.habitacion}`,

          cantidad: 1,

          valor_unitario:
            Number(data.monto) / 1.18,

          precio_unitario:
            Number(data.monto),

          descuento: "",

          subtotal:
            Number(data.monto) / 1.18,

          tipo_de_igv: 1,

          igv:
            Number(data.monto) -
            (Number(data.monto) / 1.18),

          total:
            Number(data.monto),

          anticipo_regularizacion: false
        }
      ]
    };

    console.log("PAYLOAD NUBEFACT:");

    console.log(
      JSON.stringify(payload, null, 2)
    );

    const response = await axios.post(

      NUBEFACT_URL,

      payload,

      {

        headers: {

          Authorization:
            `Token token=${NUBEFACT_TOKEN}`,

          "Content-Type":
            "application/json"
        }
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      error.response?.data ||
      error.message
    );

    return {

      success: false,
      error: error.response?.data
    };
  }
};

module.exports = {
  enviarComprobante
};