const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const cors = require('cors');
const app  = express();
app.use(express.json())
app.use(cors());

const dbName    = "employee";
const dbDisName = "dolgozó";

/*
UPADATE & INSERT
id
rendszam
tulaj
tipus
modell
evjarat
muszaki
*/

const db = new sqlite3.Database("./"+dbName+".db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message)
  console.log("Adatbázis csatlakozás sikeres!");
});

app.get("/overview/", function (request, response) {
  console.log("Lekérés...");
  const sql = 'SELECT * FROM '+dbName;
  console.log("//SQL: "+sql+"\n");
  var rows;
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row => {}))
    response.send(rows);
  });
});

app.post('/add/:param', function (request, response) {
  console.log("Hozzáadás...");
  var data = request.params.param.split('|');
  const sql = "INSERT into "+dbName+" (rendszam, tulaj, tipus, modell, evjarat, muszaki) values ('" + data[0] + "', '" + data[1] + "', '" + data[2] + "', '" + data[3] + "', '" + data[4] + "', '" + data[5] + "')";
  console.log("//SQL: "+sql);
  db.run(sql);
  /*MSG*/
  console.log("A(z) "+dbDisName+" hozzáadva!\n");
});

app.post('/update/:param', function (request, response) {
  console.log("Módosítás...");
  var data = request.params.param.split('|');
  const sql = "UPDATE "+dbName+" SET rendszam='" + data[1] + "', tulaj='" + data[2] + "', tipus='" + data[3] + "', modell='" + data[4] + "', evjarat='" + data[5] + "', muszaki='" + data[6] + "' WHERE id='" + data[0] + "'";
  console.log("//SQL: "+sql);
  db.run(sql);
  /*MSG*/
  console.log("A(z) "+dbDisName+" adatai frssítve, id: " + data[0]+"\n");
});

app.post('/remove/:param', function (request, response) {
  console.log("Törlés...");
  var data =request.params.param;
  const sql = "delete from "+dbName+" where id = '"+data+"'";
  console.log("//SQL: "+sql);
  db.run(sql);
  /*MSG*/
  console.log("A(z) "+dbDisName+" eltávolítv az adatbázisból, id: " + data+"\n");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("A szerver sikeresen elindult!");
});