import User from "../models/user.model";
import _ from 'lodash';
import errorHandler from './../helpers/dbErrorHandler';

const create = (req, res, next) => {
    console.info("INFO =>>>>>>", req.body)
    const user = new User(req.body);
    user.save((err, result) => {
        if (err) {
            console.log("ERROR+++++++++>>>>>",err);
            
            return res.status(400).json({
                error: errorHandler.getErrorMessage
            })
        }
        res.status(200).json({
            message: "Successfully signed up!"
        })
    })
}
const list = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(users)
    }).select('name email updated created');
}
const userByID = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user;
        next()
    })
}
const read = (req, res) => {
    req.profile.hased_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}
const update = (req, res, next) => {
    let user = req.profile;
    user = _.extend(user, req.body);
    user.update = Date.now();
    user.save((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        user.hased_password = undefined;
        user.salt = undefined;
        res.json(user);
    })
}
const remove = (req, res, next) => {
    let user = req.profile;
    user.remove((err, deleteUser) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        deleteUser.hased_password = undefined;
        deleteUser.salt = undefined;
        res.json(deleteUser);
    })
}

export default {
    create, list, userByID, read, remove, update
};