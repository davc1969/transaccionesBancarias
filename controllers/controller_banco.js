const pool = require("./../db/init").instancePool.getPoolInstance();

const Cursor = require("pg-cursor");


const bdCursor = async (sqlQuery) => {

    pool.connect( async (error_conexion, client, release) => {
        if (error_conexion) {
            console.log("Error de conexión: ", error_conexion.message);
        }
        else {
            try {
                const consulta = new Cursor(sqlQuery)
                const cursor = await client.query(consulta);
                cursor.read(10, (error_cursor, rows) => {
                    if (error_cursor) {
                        console.log("Error en operacion read del cursor: ", error_course.message);
                    } 
                    else {
                        console.log("rows", rows);
                        return (rows);
                        cursor.close();
                    }
                })
            } catch (error) {
                console.log("Fallo en operacion de cursor: ", error.message);
                reject (error);
            } finally {
                await release();
            }
        }
    });
}

const bdTransaccion = async (sqlQuery) => {
    return new Promise ( (resolve, reject) => {

        pool.connect( async (error_conexion, client, release) => {
            if (error_conexion) {
                console.log("Error de conexión: ", error_conexion.message);
            }
            else {
                try {

                    await client.query("BEGIN");
                    const results = await client.query(sqlQuery);
                    await client.query("COMMIT")

                    resolve (results);
                } catch (error) {
                    await client.query("ROLLBACK")
                    console.log("Fallo en la transacción: ", error.message);
                    reject (error);
                } finally {
                    await release();
                }
            }
        });
        
    })
}

const mostrarTransaccion = (sqlQuery) => {
    bdTransaccion(sqlQuery)
    .then( (results) => {
        console.log(results.rows);
    })
    .catch ( (error) => {
        console.log("No es posible continuar: ", error.message);
    })
}



const consultaTransaccion = (cuenta) => {
    console.log("Consulta de transacciones:");

    bdCursor(`select * from transacciones where cuenta = ${cuenta};`)
    .then ( (result) => {
        console.log(result);
    })
}

const nuevaTransaccion = (cuenta, monto, descripcion, fecha) => {
    console.log("Nueva transacción");
    const sqlQuery = {
        text: "insert into transacciones (cuenta, monto, descripcion, fecha) values ($1, $2, $3, $4) returning *;",
        values: [cuenta, monto, descripcion, fecha],
        rowMode: "array"
    }
    mostrarTransaccion(sqlQuery);

    //Update de cuenta
    const sqlQueryUpdate = {
        text: "update cuentas set saldo = saldo + $2 where id = $1 returning *;",
        values: [cuenta, monto],
        rowMode: "array"
    }
    mostrarTransaccion(sqlQueryUpdate);
}

const consultaSaldo = (cuenta) => {
    console.log("Consulta de saldo");
    console.log(" [cuenta, saldo] ");
    const sqlQuery = {
        text: "select * from cuentas where id = $1;",
        values: [cuenta],
        rowMode: "array"
    }
    mostrarTransaccion(sqlQuery);
    
    
}

module.exports = {
    consultaTransaccion,
    nuevaTransaccion,
    consultaSaldo
}