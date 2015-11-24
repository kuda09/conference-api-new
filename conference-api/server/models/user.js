var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");


var Schema = mongoose.Schema;


var userSchema = new Schema({

    local: {
        email: String,
        password: String
    }
});


userSchema.methods.generateHash = function (password) {

    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}


module.exports = mongoose.model("User", userSchema);

