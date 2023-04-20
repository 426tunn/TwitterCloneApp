const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT
const middleware = require('./middleware')
const path = require('path');
const session = require('express-session')
const {connectToDB} = require('./db')

const app = express()
app.use(express.json()) 
app.set('view engine', 'pug')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(session({
    secret: "sdfghjlkkh",
    resave: true,
    saveUninitialized: false
}))

const loginRoute = require('./Routes/loginRoutes')
const logoutRoute = require('./Routes/logoutRoute')
const RegisterRoute = require('./Routes/RegisterRouter')

app.use('/login', loginRoute)
app.use('/register', RegisterRoute) 
app.use('/logout', logoutRoute) 
 
app.get('/', middleware.requireLogin, (req, res)=> {
    res.render('home')
})


connectToDB();


 
app.listen(PORT, ()=> {
    console.log(`app is listening on port: ${PORT}`)
}) 

module.exports = app