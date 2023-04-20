const express = require('express')
const app = express() 
const router = express.Router()
const UserModel = require('../Model/userModel')
const bcrypt = require('bcrypt')

app.set('view engine', 'pug');
app.set('views', 'views');

router.get('/', (req, res, next) => {
    res.status(200).render('register');
})

router.post('/', async (req, res, next) => {
    const firstName = req.body.firstName.trim();
    const lastName = req.body.lastName.trim();
    const email = req.body.email.trim();
    const username = req.body.username.trim();
    const password = req.body.password;

    const user = req.body;

    if (firstName && lastName && email && username && password){
       const  userExists = await UserModel.findOne({
            $or: [
                {username: username},
            {email: email} 
        ]
        })
        .catch((err)=> {
            console.log(err, "An error occured")
            user.errorMessage = "Something went wrong";
            res.status(500).render('register', user)
        })
        
        if (userExists === null){
           
            user.password = await bcrypt.hash(password, 10)
            await UserModel.create(user)
            .then((user) => {
                req.session.user = user
                res.status(200).redirect("/")
                
            }).catch((err) => {
                console.log(err)
                user.errorMessage = "error creating user"
                res  
                .status(500)
                .render('register', user) 
            });
        } else if (username == userExists.username){
             user.errorMessage = 'username already exists'
             console.log('username already exists')
             res.status(500).render('register', user)
        } else {
            user.errorMessage = 'email already exists'
            console.log('email already exists')
            res.status(500).render('register', user)
        }

    } else {
        user.errorMessage = "Input values to all fields"
        res.status(500).render('register', user)
    }  
})

 module.exports = router;