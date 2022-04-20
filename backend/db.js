const sqlite3 = require("sqlite3").verbose();
const fs = require('fs');

const dbName = "employee";

/*
CREATE
id
rendszam
tulaj
tipus
modell
evjarat
muszaki
*/

fs.open(dbName+'.db', 'w', function (err, file) {
  if (err) throw err;
  console.log('Saved!');
});

const db = new sqlite3.Database("./"+dbName+".db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
  
    console.log("connection succesful");
  });
  
db.run(`CREATE TABLE `+dbName+`(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rendszam TEXT UNIQUE NOT NULL,
        tulaj TEXT NOT NULL,
        tipus TEXT NOT NULL,
        modell TEXT NOT NULL,
        evjarat TEXT NOT NULL,
        muszaki TEXT NOT NULL
)`);

/*
const sql ='INSERT INTO '+dbName+'(name, email, address) VALUES(?,?,?)';
db.run(sql, ["mike","asd@gmail.com", "aaaaaa aaaa"], (err)=>{
    if(err) return console.error(err.message);

    console.log("A new row added!");
});
*/
