import os from "node:os"
import ms from "ms"
console.log("Informacion del sistema operativo:")

console.log("Tipo de SO:", os.type())
console.log("Plataforma:", os.platform())
console.log("Arquitectura:", os.arch())
console.log("Memoria total (bytes):", os.totalmem())
console.log("Memoria libre (bytes):", os.freemem())
console.log("Directorio home del usuario:", os.homedir())
console.log("Tiempo de actividad del sistema (segundos):", ms(os.uptime() * 1000, { long: true }))
//console.log("CPUS:", os.cpus())
console.log("Interfaz de rec:", os.networkInterfaces())
console.log("_______________________________________________________")