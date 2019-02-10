const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()

let db
let flashCards = []

app.set("view engine", "pug")
// set path to public folder
app.use(express.static(__dirname + "/public/"));;
// set path to scripts folder
app.use(express.static(__dirname + "/scripts/"));;

app.use(bodyParser.urlencoded({ extended: true }))


MongoClient.connect("mongodb://senor:senor123@ds053166.mlab.com:53166/flashcardz", (err, database) => {
    db = database.db("flashcardz")
    let cursor = db.collection("flashcards").find().toArray((err, results) => {
        flashCards = results
        if (err) return console.log(err)
        app.listen(3000, function () {
            console.log("Listening on port 3000!!!!")
        })
    })
})
app.get("/", (req, res, next) => {
    res.render('index.pug')
})


app.get("/cards", (req, res, next) => {
    let cursor = db.collection("flashcards").find().toArray((err, results) => {
        if (err) return console.log(err)
        console.log(results)
        res.render('flashcards.pug')
    })
})

app.get("/updateCards", (req, res, next) => {
    let cursor = db.collection("flashcards").find().toArray((err, results) => {
        if (err) return console.log(err)
        console.log(results)
        res.render('updateCards.pug')
    })
})

app.get('/flashcards', (req, res, next) => {
    res.send(flashCards)
})

app.post("/flashcards", (req, res, next) => {
    db.collection('flashcards').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database :)')
        res.redirect('/')
    })
})

app.delete("/updateCards", (req, res, next) => {
    res.render('updateCards.pug')
})
