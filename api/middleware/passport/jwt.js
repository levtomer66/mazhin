const passport = require("passport");
const { Strategy } = require("passport-jwt");
const userService = require('../../services/usersService')


const jwtSecret = process.env.JWT_SECRET;
const opts = {
	secretOrKey: jwtSecret,
	jwtFromRequest: function (req) {
		let token = req && req.cookies && req.cookies[process.env.COOKIE_NAME];
		return token;
	},
};
passport.use(
	new Strategy(opts, async function (jwt_payload, done) {
		let user = {}
        try {
			user = await userService.getUserByEmail(jwt_payload.user.email);
        } catch (e) {
            done(new Error("failed to auth" + e, null));
        }
		if (user) {
			done(null, user);
		}
	})
);
