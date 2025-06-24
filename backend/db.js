const mysql = require("mysql2")

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"task"
})

db.connect((err)=>{
    if(err) {
        console.log(err)
        return
    }

    console.log('database connected')
})
module.exports = db