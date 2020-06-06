//importar dependência do SQLite 3
const sqlit3 = require("sqlite3").verbose()

// Objeto que fará operações no banco de dados
const db = new sqlit3.Database("./src/database/database.db")

module.exports = db

db.serialize(() => {
  // Criar uma tabela
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id  INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `)


//   // Detelar um dado da tabela
//   db.run(`DELETE FROM places WHERE id = ?`, [2], function(err) {
//     if (err) {
//       return console.log(err)
//     }

//     console.log("Registro deletado com sucesso!")
//   })

})