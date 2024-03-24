const express = require("express")
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "mycoin"
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`username`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json('Error')
        }
        return res.json(data)
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `username` = ? AND `password` = ?";
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if(err) {
            return res.json('Error')
        }
        if(data.length > 0) {
            const username = data[0].username;
            return res.json({status: "Success", username: username})
        } else {
            return res.json("Fail")
        }
        
    })
})

app.get('/Income', (req, res) => {
    const sql = "SELECT * FROM Income";
    db.query(sql, (err, data) => {
        if(err) {
            return res.json('Error')
        } else {
            return res.json(data)
        }  
        
    })
})






// app.get('/Income', (req, res) => {
//     const username = req.query.username;
//     const sql = "SELECT * FROM login WHERE `username` = ?";
//     db.query(sql, [username], (err, data) => {
//         if(err) {
//             return res.json('Error')
//         } else {
//             res.send(data)
//         }
        
        
//     })
// })

app.listen(8801, () => {
    console.log('listening');
})