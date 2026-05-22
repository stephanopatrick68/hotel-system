const pool = require("../database/db");

const obtenerSiguienteNumero =
async(serie)=>{

  try{

    // Obtener valor actual

    const result =
      await pool.query(

        `
        SELECT ultimo_numero
        FROM series
        WHERE serie=$1
        `,

        [serie]
      );

    if(result.rows.length===0){

      throw new Error(
        "Serie no encontrada"
      );
    }

    const ultimoNumero =
      result.rows[0]
      .ultimo_numero;

    // Incrementar

    const siguienteNumero =
      ultimoNumero + 1;

    // Actualizar BD

    await pool.query(

      `
      UPDATE series
      SET ultimo_numero=$1
      WHERE serie=$2
      `,

      [
        siguienteNumero,
        serie
      ]
    );

    // Retornar el nuevo

    return siguienteNumero
      .toString();

  }catch(error){

    console.error(error);

    throw error;
  }
};

module.exports = {
  obtenerSiguienteNumero
};