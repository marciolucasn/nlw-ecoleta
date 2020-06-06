const express = require("express")
const server = express()
const db = require("./database/db") // Pegar o banco de dados

// Habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))

server.use(express.static("public"))

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

// ---- Routes ---- 
server.get("/", (req, res) => {
  return res.render("index.njk")
})

server.get("/create-point", (req, res) => {
  return res.render("create-point.njk")
})

server.post("/savepoint", (req, res) => {

  // Inserir dados na tabela
  const query = `
    INSERT INTO places (
      image, 
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?, ?, ?, ?, ?, ?, ?);
  `

  const values = [
    // req.body: Refere-se ao corpo do formulário
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
    if (err) {
      return console.log(err)
    }

    console.log(values)
  }

  db.run(query, values, afterInsertData)

  return res.render("create-point.njk", { saved: true })
})

server.get("/search", (req, res) => {

  const search = req.query.search

  if (search == "") {
    return res.render("search-results.njk", { total: 0 })
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
    if (err) {
      return console.log(err)
    }
    const total = rows.length
    return res.render("search-results.njk", { places: rows, total })
  })

})

server.listen(3000) // Ligar o servidor
