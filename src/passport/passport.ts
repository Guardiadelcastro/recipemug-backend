import {Strategy, ExtractJwt} from 'passport-jwt';
import {User} from '../models/user';
import {configuration}  from '../passport/index';



export const addUserId = function(passport) {
  let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: configuration.auth.secret //PREGUNTAR A RAUL. 
  };

  passport.use(new Strategy(opts, (jwt_payload, done) => {
    User.findOne({
      id: jwt_payload.id
    }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};