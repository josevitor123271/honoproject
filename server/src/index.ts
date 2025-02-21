import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { cors } from 'hono/cors'

const app = new Hono()

// app.get('/', (c) => {
//   return c.text('Hello from server!')
// });

// Cria um midleware para servir arquivos estáticos
app.use("/api/*", cors());

// Servir arquivos estáticos da pasta jsons
app.use("/api/jsons/*", serveStatic({
  root: "./jsons"
}));

// Servindo o arquivo estático moedas.json
app.get("/api/moedas", (c) => {
  return c.json(require("./jsons/moedas.json"))
});

// Servindo o arquivo estático nomes.json
app.get("/api/nomes", (c) => {
  return c.json(require("./jsons/nomes.json"))
});

// Servindo uma tag
app.get("/api/*", (c) => {
  return c.html("<h1> API de Conversão de Moedas</h1>");
})

export default {
  port: 8080,
  fetch: app.fetch
}
