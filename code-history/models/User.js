const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String
    },
    salt: {
        type: String
    },
    regDate: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    },
    savedCodes: [{ type: Schema.Types.ObjectId, ref: 'Code' }]
});

UserSchema.methods.generateSalt = function(){
    const rounds = 10;
    return bcrypt.genSaltSync(rounds);
}

UserSchema.methods.hashPassword = function(password, salt){
    return bcrypt.hashSync(password, salt);
}

UserSchema.methods.validPassword = function(password, hash){
    return bcrypt.compareSync(password, hash).valueOf();
}

const User = mongoose.model('User', UserSchema);

module.exports = User;