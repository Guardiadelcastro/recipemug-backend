"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const user_1 = require("../models/user");
const index_1 = require("../passport/index");
exports.addUserId = function (passport) {
    let opts = {
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: index_1.configuration.auth.secret
    };
    passport.use(new passport_jwt_1.Strategy(opts, (jwt_payload, done) => {
        user_1.User.findOne({
            id: jwt_payload.id
        }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        });
    }));
};
