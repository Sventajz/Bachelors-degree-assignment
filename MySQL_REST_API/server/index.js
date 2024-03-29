const express = require('express');
const bodyParser = require('body-parser');
const app = express ();
const mysql = require('mysql')
const cors = require ('cors');

const db = mysql.createConnection({
    host: "localhost",
    user: "ENTER YOUR USERNAME",
    password: "ENTER YOUR PASSWORD",
    database: "cruddatabase"
})

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

app.get("/api/get",(req,res) => {
    const sqlSelect = "SELECT * FROM movie_review;"
    db.query(sqlSelect, (err,result) => {
            res.send(result);
        })
})


app.post("/api/insert",(req,res) => {
    
    const movieName = req.body.movieName
    const movieReview = req.body.movieReview
    
    const sqlInsert = 
    "INSERT INTO movie_review (movieName,movieReview) VALUES (?,?);"
    db.query(sqlInsert, [movieName,movieReview], 
        (err,result) => {
            console.log(result);
        })
})

app.delete("/api/delete/:movieName", (req,res) => {
    const name = req.params.movieName;
    const sqlDelete = 
    "DELETE FROM movie_review WHERE movieName = ?";
    db.query(sqlDelete,name, (err,result) =>{
       if (err) console.log(err)
    })

})

app.put("/api/update",(req,res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview
    sqlUpdate = 
    "UPDATE movie_review SET  movieReview = ? WHERE movieName = ?";
    db.query(sqlUpdate,[review,name], (err,result) => {
        if (err) console.log(err);
    } )
})


app.listen (3001,() => {
    console.log("running on port 3001");
})