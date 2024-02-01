const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
Correo: {type:String},
Contraseña: {type:String},
Rol:{type:String},
Username:{type:String},

});



UserSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.Contraseña, 10, (error, hash) => {
        user.Contraseña = hash
        next()
        })
        })


// export model
const Usuario = mongoose.model('Usuario',UserSchema);
module.exports =Usuario