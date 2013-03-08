var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    if(username === 'alex' && password === 'psy'){
      return done(null, {
        name: 'jose',
        mail: 'j@f.r'
      });
    } else {
      return done(null, false, {message: 'wrong user name or password'});
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});