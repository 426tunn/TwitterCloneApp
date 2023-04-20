const express = require('express')
const app = express()
const router = express.Router()
const bcrypt = require('bcrypt')
const UserModel = require('../Model/userModel')


app.set('view engine', 'pug');
app.set('views', 'views');

router.get('/', (req, res, next) => {
    res.status(200).render('login');
})

router.post('/', async (req, res, next) => {

    const user = req.body
    if(req.body.logPassword && req.body.logUsername){
        const  userExists = await UserModel.findOne({
            $or: [
                {username: req.body.logUsername},
            {email: req.body.logUsername}
        ]
        })
        .catch((err)=> {
            console.log(err, "An error occured")
            user.errorMessage = "Something went wrong";
            res.status(500).render('login', user)
        })

        if(userExists){
            const compare = await bcrypt.compare(req.body.logPassword, userExists .password)

            if(compare === true){
                req.session.user = userExists
                return res.redirect('/')
            } else {
                user.errorMessage = "Password Incorrect";
             return res.status(500).render('login', user)
            }
        }
        user.errorMessage = "user does not exist";
         return res.status(500).render('login', user)
    }

    user.errorMessage = "Cannot leave input blank";
     return res.status(200).render('login', user);
})

 module.exports = router; 