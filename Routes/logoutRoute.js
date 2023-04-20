const express = require('express')
const app = express()
const router = express.Router()
const bcrypt = require('bcrypt')
const UserModel = require('../Model/userModel')


app.set('view engine', 'pug');
app.set('views', 'views');

router.get('/', (req, res, next) => {
    if(req.session.destroy){
        req.session.destroy(()=> {
            res.redirect('/login')
        })
    }
})
 module.exports = router