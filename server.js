import { createServer } from 'http'
import { readFile } from 'fs'

const PORT = 3000

readFile('task.html', function (err, html) {
  if (err) throw err

  createServer(function (request, response) {
    response.writeHeader(200, { 'Content-Type': 'text/html' })
    response.write(html)
    response.end()
  }).listen(PORT)
  console.log(`Server running at http://localhost:${PORT}`)
})
