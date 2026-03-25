import { createServer } from "node:http"
import { json } from "node:stream/consumers"
import { randomUUID } from "node:crypto"

process.loadEnvFile()

const port = process.env.PORT ?? 3001

const sendJson = (res, statusCode, data) => {
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(data))
}

const users = [{ id: 1, name: "Eduardo" }, { id: 2, name: "Jorge" }]

const server = createServer(async (req, res) => {

    const { method, url } = req
    const [pathname, querystring] = url.split('?')
    const searchParams = new URLSearchParams(querystring)

    if (method === 'GET') {

        if (pathname === "/") {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            return res.end("Hola desde servidor de node 👍!")
        }

        if (pathname === "/users") {
            const limit = Number(searchParams.get('limit')) || users.length
            const offset = Number(searchParams.get('offset')) || 0
            console.log("limit:" + limit)
            console.log("offset:" + offset)
            const paginatedUsers = users.slice(offset, offset + limit)
            return sendJson(res, 200, paginatedUsers)
        }

        if (pathname === "/health") {
            const data = { status: "ok", uptime: process.uptime() }
            return sendJson(res, 200, data)
        }
    }

    if (method === 'POST') {

        if (pathname === "/users") {
            const body = await json(req)
            if (!body || !body.name) {
                return sendJson(res, 400, { message: "Name is requiered" })
            }
            const newUser = {
                id: randomUUID(),
                name: body.name
            }
            users.push(newUser)
            return sendJson(res, 201, { message: "Usuario creado" })
        }
    }

    return sendJson(res, 404, { message: "Not found" })
})

server.listen(port, () => {
    console.log(`Servidor escuchando en  http://localhost:${port}`)
})