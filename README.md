# Transacciones bancarias
## Desafío Latam e-camp - Transacciones, cursores en node pg
#### Módulo 7, día 4

EL programa simula transacciones bancarias de manera sencilla.  Se le dan las opciones por línea ed comandos.  El programa está coenctado con una base de datos llamada Banco que tiene dos tablas: Transacciones y Cuentas.

De momento solo se permiten hacer 3 operaciones:
 - **Transacciones**: utilizando cursores, se muestran las transacciones existentes para una cuenta específica
 - **Saldo**: muestra el saldo de una cuenta indicada
 - **Nueva**: genera una neuva transacción, inserta la transacción en su base de datos, indicando cuenta asociada, fecha, monto y descripción, y también actualiza la información del saldo de la cuenta.

Se trabaja con transacciones que permiten COMMIT y ROLLBACK de manera de no romper las condiciones de las tablas.

Se utilizaron las librerías pg, pg-cursor.  Para el manejo de los objetos necesarios para la implementación de la base de datos, se utilizó el patrón de diseño Singleton para evitar que hubiese mas de una instancia del objeto Pool abierta.

Hecho por *Darío Valenzuela*, septiembe 2021