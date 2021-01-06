const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Admin = require('./../models/adminModel');

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        Admin.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
            session: true
        },
            async function (req, email, password, done) {
                try {
                    const user = await Admin.findOne({ email: email });
                    if(!user.isAuthenticated) {
                        return done(null, false, {
                            message: 'Your account has not be authenticated',
                        });
                    }
                    
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (err) {
                            return done(err);
                        }
                        if (!result) {
                            return done(null, false, {
                                message: 'Incorrect username and password',
                            });

                        }
                        return done(null, user);
                    });
                } catch (err) {
                    return done(err);
                };
            })
    );

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        session: true
    },
        async function(req, email, password, done){
            try {
                const user = await Admin.findOne({ email: email });
                
                if(user){
                    return done(null, false, {
                        message: 'Email already in use !!',
                    })
                }
                
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!re.test(String(req.body.email).toLowerCase())) {
                    return done(null, false, {
                        message: 'Email is unvalid format!'
                    });
                }
                
                if (password.length < 6) {
                    return done(null, false, {
                      message: 'Password needs at least 6 characters',
                    });
                }
                
                if (password !== req.body.confirmPassword) {
                    return done(null, false, {
                      message: 'Passwords do not match !'
                    });
                }
                
                const newUser = await Admin.create(req.body)
                
                if(!newUser){
                    return done(null, false, {
                        message: 'Something went wrong'
                    })
                }
                return done(null, newUser)
                
            } catch (err) {
                return done(err)
            } 
        }
    ));
}


