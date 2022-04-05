const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json())
app.use(cors());

const db = new sqlite3.Database("./autok.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);

  console.log("Adatbázis csatlakozás sikeres!");
});

app.get("/overview/", function (request, response) {
  console.log("főoldal");
  const sql = 'SELECT * FROM cars';
  var rows;
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row => {
      //console.log(rows);
    }))
    response.send(rows);
  });

});

app.post('/addcar/:param', function (request, response) {
  console.log("Hozzáadás...");
  var data = request.params.param.split('|');
  console.log(data);
  const sql = "INSERT into cars (rendszam, tulaj, tipus, modell, evjarat, muszaki) values ('" + data[0] + "', '" + data[1] + "', '" + data[2] + "', '" + data[3] + "', '" + data[4] + "', '" + data[5] + "')";
  console.log(sql);
  db.run(sql);
  console.log("Autó hozzáadva!");
});

app.post('/updatecar/:param', function (request, response) {
  console.log("Módosítás...");
  var data = request.params.param.split('|');
  console.log(data);
  const sql = "UPDATE cars SET rendszam='" + data[1] + "', tulaj='" + data[2] + "', tipus='" + data[3] + "', modell='" + data[4] + "', evjarat='" + data[5] + "', muszaki='" + data[6] + "'' WHERE id='" + data[0] + "'";
  console.log(sql);
  db.run(sql);
  console.log("Az autó adatai frssítve, id: " + data[0]);
});

app.post('/removecar/:param', function (request, response) {
  console.log("Törlés...");
  var data =request.params.param;
  const sql = "delete from cars where id = '"+data+"'";
  console.log(sql);
  db.run(sql);
  console.log("Az autó eltávolítv az adatbázisból, id: " + data);
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("A szerver sikeresen elindult!");
});