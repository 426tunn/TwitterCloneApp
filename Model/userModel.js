const mongoose = require('mongoose');
// const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true, 
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
       
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long']
    },
    profilePic: {
        type: String,
        default: "/images/profilePic.png"
    }
},  {timestamps: true});


UserSchema.set('toJSON', {
    transform: (document, returnedObject)=> {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v 
    }
})


// UserSchema.pre('save', async (next)=> {
//     const user = this
//     const hash = await bcrypt.hash(this.password, 10)

//     this.password = hash
//     next();

// })

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel