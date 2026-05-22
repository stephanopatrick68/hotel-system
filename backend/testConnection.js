const pool = require("./database/db");

async function test(){

  try{

    const result =
      await pool.query(
        "SELECT NOW()"
      );

    console.log(result.rows);

  }catch(error){

    console.error(error);
  }
}

test();