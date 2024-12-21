import http from "node:http";
import fs from "node:fs";


const server = http.createServer((req, res) => {
    // const data = fs.readFileSync(import.meta.dirname + "/data.txt")
    // res.end(data)

    const readStream = fs.createReadStream(import.meta.dirname + "/data.txt")
    readStream.pipe(res)
})

server.listen(8000)