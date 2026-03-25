import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'

let content = ''
if (process.permission.has('fs.read', 'archivo.txt')) {
    content = await readFile('archivo.txt', 'utf-8')
    console.log(content)
} else {
    console.log("No tienes permisos para leer el archivo.")
}

if (process.permission.has('fs.write', 'output/files/documents')) {
    const outputDir = join('output', 'files', 'documents')
    await mkdir(outputDir, { recursive: true })

    const uppercaseContent = content.toUpperCase()
    const outputFilePath = join(outputDir, 'archivo-uppercase.txt')

    console.log("La extencion es:", extname(outputFilePath))
    console.log("El nombre es:", basename(outputFilePath))

    await writeFile(outputFilePath, uppercaseContent)
    console.log('Archivo creado con contenido en mayusculas')
} else {
    console.log("No tienes permisos para escribir en el archivo")
}