const sqlite3 = require("sqlite3").verbose();
const fs = require('fs');

fs.open('employee.db', 'w', function (err, file) {
  if (err) throw err;
  console.log('Saved!');
});

const db = new sqlite3.Database("./employee.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
  
    console.log("connection succesful");
  });
  
db.run('CREATE TABLE employees(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, address TEXT NOT NULL)');

/*
const sql ='INSERT INTO employees(name, email, address) VALUES(?,?,?)';
db.run(sql, ["mike","asd@gmail.com", "aaaaaa aaaa"], (err)=>{
    if(err) return console.error(err.message);

    console.log("A new row added!");
});
*/
