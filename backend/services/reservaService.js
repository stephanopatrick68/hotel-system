const pool = require("../database/db");

const guardarReserva = async(data)=>{

  try{

    const query = `

      INSERT INTO reservas (

        nombre,
        documento,
        tipo_documento,
        habitacion,
        tipo_habitacion,
        fecha_ingreso,
        fecha_salida,
        tipo_horario,
        monto,
        tipo_comprobante,
        serie,
        numero,
        estado_sunat,
        xml_url,
        pdf_url

      )

      VALUES (

        $1,$2,$3,$4,$5,
        $6,$7,$8,$9,$10,
        $11,$12,$13,$14,$15

      )

      RETURNING *;
    `;

    const values = [

      data.nombre,

      data.documento,

      data.documento.length === 11
        ? "RUC"
        : "DNI",

      data.habitacion,

      data.tipoHabitacion,

      data.fechaIngreso,

      data.fechaSalida,

      data.modo,

      data.monto,

      data.documento.length === 11
        ? "FACTURA"
        : "BOLETA",

      data.serie,

      data.numero,

      data.estadoSunat,

      data.xmlURL,

      data.pdfURL
    ];

    const result = await pool.query(
      query,
      values
    );

    return result.rows[0];

  }catch(error){

    console.error(error);

    throw error;
  }
};

module.exports = {
  guardarReserva
};