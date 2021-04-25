const app = require('../../app')
const postsController = require("../../controllers/postsController");
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });

app.get("/api/posts", postsController.getPosts);
app.get("/api/posts/:id", postsController.getPostById);
app.post("/api/posts", auth, postsController.savePost);
app.put("/api/posts", auth, postsController.savePost);

module.exports = app
