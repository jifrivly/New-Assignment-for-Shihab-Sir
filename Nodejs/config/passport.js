const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const adminModel = require("../admin/adminModel");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "12345";
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";

module.exports = function (passport) {
    passport.use(
        new JwtStrategy(opts, function (jwt_payload, done) {
            adminModel.findOne({ id: jwt_payload.sub }, function (err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        })
    );

    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            (username, password, done) => {
                adminModel.findOne({ email: username }, (err, user) => {
                    if (err) {
                        return done(err, false);
                    }
                    if (!user) {
                        return done(null, false);
                    }
                    if (user) {
                        if (user.password != password) {
                            return done(null, false);
                        } else {
                            console.log("credintiols are match login success")
                            // var token = jwt.sign({ user }, "1234", { expiresIn: 120 });
                            return done(null, user);
                        }
                    }
                });
            }
        )
    );
};
