import passport from "passport";
import local from "passport-local";

import UserModel from "../models/user.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";

const LocalStrategy = local.Strategy;

export const initializePassport = () => {
    passport.use("register", new LocalStrategy({
        //Le digo que quiero acceder al objeto request
        passReqToCallback: true, 
        usernameField: "email"
    }, async (req, username, password, done) => {
        const {first_name, last_name, age, email} = req.body;

        try {
            //Verificamos si ya existe un registro con ese email
            let user = await UserModel.findOne({email});
            if(user) return done(null, false);

            //Si no existe, lo voy a crear 

            let newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }

            let result = await UserModel.create(newUser);
            return done(null, result);
        } catch (error) {
            return done(error);
        }
    }))
}