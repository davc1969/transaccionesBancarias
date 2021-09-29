
const banco = require("./controllers/controller_banco")


const args = process.argv.slice(2);


switch (args[0].toUpperCase()) {
    case "NUEVA" :
        banco.nuevaTransaccion(args[1], args[2], args[3], args[4]);
        break;

    case "TRANSACCIONES" :
        banco.consultaTransaccion(args[1]);
        break;

    case "SALDO" :
        banco.consultaSaldo(args[1]);
        break;

    case "AYUDA" :
        console.log("Programa simple para manejar transacciones bancarias");
        console.log("");
        console.log("opciones:");
        console.log("  node index transacciones cuenta : Muestra las 10 transacciones mas recientes de la cuenta indicada");
        console.log("  node index nueva cuenta monto descripcion fecha : Agrega una transaccion a la cuenta indicada con el monto, descripcion y fecha indicadas");
        console.log("  node index saldo cuenta : muestra el saldo de la cuenta indicada");
        console.log("  node index ayuda :  muestra este mensaje como guía de uso");
        console.log("");
        console.log("-------------------");
        break;
}