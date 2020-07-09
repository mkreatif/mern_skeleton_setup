import mongoose from 'mongoose';
import crypto from 'crypto'

// Declare the Schema of the Mongo model
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: 'Email is required',
        unique: 'Email already exist',
        match: [/.+\@.+\..+/, 'Please fill valid email address']
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    hashed_password: {
        type: String,
        required: 'Password is required',
    },
    salt: String
});

UserSchema
    .virtual('password')
    .set(function (password) {
        console.log("ENTER VIRTUAL PASSWORD=============>>", password);

        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
        console.log("HASHED_PASSWORD IS =============>>", this.hashed_password);
    })
    .get(function () {
        return this._password;
    });

UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        console.log("ENTER ECRYPT PASSWORD ====>",password);

        if (!password) { return ''; }
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (error) {
            console.log("ECRYPT PASSWORD ERROR :::::::::", error);
            
            return '';

        }
    },
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}

UserSchema.path('hashed_password').validate(function (v) {
    console.log("ENTER PATH HASHED_PASSWORD");
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.');
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required')
    }
}, null);

export default mongoose.model('User', UserSchema);