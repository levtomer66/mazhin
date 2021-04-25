const app = require('../app')
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });

app.get('/api', (req, res) => {
    res.status(200).send({
        message: 'Mazhin API!'
    })
})

module.exports = app
