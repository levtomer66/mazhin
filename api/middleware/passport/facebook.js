const passport = require("passport");
const fbStrategy = require("passport-facebook");
const { handleSignIn } = require('../../controllers/usersController')

const FacebookStrategy = fbStrategy.Strategy;

const facebookAppSecret = process.env.FACEBOOK_APP_SECRET
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const BASE_API_URL = process.env.BASE_API_URL

passport.use(
	"facebook",
	new FacebookStrategy(
		{
			clientID: FACEBOOK_APP_ID,
			clientSecret: facebookAppSecret,
			callbackURL: `${BASE_API_URL}/api/users/auth/facebook/callback`,
			profileFields: [
				"email",
				"first_name",
				"last_name",
				"gender",
				"birthday",
				"picture.width(70)",
			],

		},
		handleSignIn
	)
);
