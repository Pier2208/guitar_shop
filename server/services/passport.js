const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const { User } = require('../models/User')

require('dotenv').config()

//passport middleware
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {

        try {

            console.log(profile.displayName)
            console.log(profile.name)
            console.log(profile.name.givenName)
            console.log(profile.name.familyName)

            const existingUser = await User.findOne({ "google.id": profile.id})

            //if a user exists with this googleID, just create a new token
            if(existingUser) {
                existingUser.generateToken((err, user) => {
                    if(err) throw err
                    done(null, user)
                })
            }
            //if no existing user with this googleID , create a new user
            const user = await new User({
                'authMethod': 'google',
                'google.id': profile.id,
                'google.email': profile.emails[0].value,
                'google.firstname': profile.name.givenName,
                'google.lastname': profile.name.familyName
            }).save()
            
            //and generate a token
            user.generateToken((err, user) => {
                if (err) throw err
                done(null, user)
            }) 

        } catch(err) { 
            console.log(err)
        }
    }
))
