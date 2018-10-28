const passport = require('passport')
const AmazonStrategy = require('passport-amazon').Strategy

const { User } = require('../../models/User')

require('dotenv').config()


passport.use(new AmazonStrategy({
    clientID: process.env.AMAZON_CLIENT_ID,
    clientSecret: process.env.AMAZON_CLIENT_SECRET,
    callbackURL: '/auth/amazon/callback'
},
    async (accessToken, refreshToken, profile, done) => {

        try {

            const existingUser = await User.findOne({ "amazon.id": profile._json.user_id })

            //if a user exists with this amazonID, just create a new token
            if (existingUser) {
                existingUser.generateToken((err, user) => {
                    if (err) throw err
                    done(null, user)
                })
            }
            //if no existing user with this amazonID , create a new user
            const user = await new User({
                'authMethod': 'amazon',
                'amazon.id': profile._json.user_id,
                'amazon.email': profile._json.email,
                'amazon.firstname': profile._json.name.split(' ')[0],
                'amazon.lastname': profile._json.name.split(' ').slice(1, 5)
            }).save()

            //and generate a token
            user.generateToken((err, user) => {
                if (err) throw err
                done(null, user)
            })

        } catch (err) {
            console.log(err)
        }
    }
))