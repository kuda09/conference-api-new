var LocalStrategy = require("passport-local").Strategy;

//import the user model
var User = require("../routes/users");

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {

        done(null, user.id);

    });

    passport.deserializeUser(function (id, done) {

        User.findById(id, function (error, user) {

            done(error, user);
        })

    })

    passport.use("local-login", new LocalStrategy({

            usernameField: "email",
            passportField: "passport",
            passReqToCallback: true,
        },
        function (request, email, password, done) {

            if (email) {

                email = email.toLowerCase();
            }

            process.nextTick(function () {

                User.findOne({'local.email': email}, function (error, user) {

                    if (error) {

                        return done(error);
                    }

                    if (!user) {

                        return done(null, false, request.flash('loginMesssage', "No user found"))
                    }

                    if (!user.validPassword(password)) {

                        return done(null, false, request.flash("loginMessage", "Warning! Wrong password"));
                    } else {

                        return done(null, false);
                    }


                });

            });

        }));

    passport.use('local-signup', new LocalStrategy({

            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },
        function (request, email, password, done) {

            if (email) {

                email = email.toLowerCase();
            }

            process.nextTick(function () {

                if (!request.user) {

                    User.findOne({"local.email": email},
                        function (error, user) {

                            if (error) {

                                return done(error);
                            }

                            if (user) {

                                return done(null, false);
                                request.flash("signupMessage", "Warning! the emaill is already taken.");

                            } else {

                                var newUser = new User();

                                newUser.local.email = email;
                                newUser.local.password = newUser.generateHash(password);


                                newUser.save(function (error) {

                                    if (error) {

                                        throw error;
                                    }

                                    return done(null, newUser);
                                });
                            }

                        });
                } else {

                    return done(null, request.user);
                }


            })

        }
    ))

}



