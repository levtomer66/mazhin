const passport = require("passport");
const googleStrategy = require("passport-google-oauth20");
const { handleSignIn } = require('../../controllers/usersController')

const GoogleStrategy = googleStrategy.Strategy;

const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const baseApiUrl = process.env.BASE_API_URL;

passport.use(
	"google",
	new GoogleStrategy(
		{
			clientID: googleClientId,
			clientSecret: googleClientSecret,
			callbackURL: `${baseApiUrl}/api/users/auth/google/callback`,
            scope: ["profile", "email", "user.birthday.read", "user.gender.read"],
		},
		handleSignIn
	)
);
