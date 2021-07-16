const Examiner = require('./models/Examiner')
const Students = require('./models/student')
const passport = require ('passport')       
const passportLocalMongoose = require("passport-local-mongoose")


//serialize deserizlize
passport.serializeUser(function (entity, done) {
    done(null, { id: entity.id, role: entity.role });
});

passport.deserializeUser(function (obj, done) {
    switch (obj.role) {
        case 'student':
            Students.findById(obj.id)
                .then(user => {
                    if (user) {
                        done(null, user);
                    }
                    else {
                        done(new Error('user id not found:' + obj.id, null));
                    }
                });
            break;
        case 'Examiner':
            Examiner.findById(obj.id)
                .then(device => {
                    if (device) {
                        done(null, device);
                    } else {
                        done(new Error('device id not found:' + obj.id, null));
                    }
                });
            break;
        default:
            done(new Error('no entity type:'+ obj.role, null));
            break;
            }
        })