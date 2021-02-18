import { server, port } from './app'

server.listen(port, () => {
  console.log(`Wella! node-server is listening to localhost:${port}`)
})
