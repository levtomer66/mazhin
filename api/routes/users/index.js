const app = require('../../app')
const {
  facebookAuth,
  facebookCallback,
  googleAuth,
  googleCallback,
  generateUserToken,
  getAdminsAbout,
  getProfileDetails,
  setProfileDetailsForUser
} = require('../../controllers/usersController')
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });


app.get('/api/users', (req, res) => {
  res.status(200).send({
    message: 'users API!'
  })
});



app.get("/api/users/auth/facebook", facebookAuth());
app.get("/api/users/auth/facebook/callback", facebookCallback(), generateUserToken);
app.get("/api/users/auth/google", googleAuth());
app.get("/api/users/auth/google/callback", googleCallback(), generateUserToken);

app.get("/api/users/getAbout", getAdminsAbout);
app.get("/api/users/me", auth, getProfileDetails)

app.post("/api/users/updateDetails", auth, setProfileDetailsForUser)
module.exports = app
