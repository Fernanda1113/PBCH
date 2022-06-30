import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import AuthUserService from "../services/authUserService.js";

const authUserService = new AuthUserService();

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      return authUserService.verifyRegister({}, username, password, done);
    }
  )
);

passport.use("login", new LocalStrategy(authUserService.verifyLogin));

passport.serializeUser(authUserService.serializeUser);

passport.deserializeUser(authUserService.deserializeUser);

const passportAuthLogin = passport.authenticate("login", {
  failureRedirect: "/login-error",
  failureMessage: true,
  successRedirect: "/"
});

const passportAuthRegister = passport.authenticate("register", {
  failureRedirect: "/register-error",
  failureMessage: true,
  successRedirect: "/",
  successMessage: "¡Gracias por registrarte en nuestro sitio!"
});

export { passport, passportAuthLogin, passportAuthRegister };