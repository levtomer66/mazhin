const postsService = require('../services/postsService');

export const getPosts = async (req, res) => {
    const category = req.query.category;

    // Select the users collection from the database
    const posts = await postsService.getPostsByCategory(category);

    // Respond with a JSON string of all users in the collection
    res.status(200).send(posts)
  }

  export const getPostById = async (req, res) => {
    const postId = req.params.id;

    // Select the users collection from the database
    const post = await postsService.getPostsById(postId);
    if (!post) {
      return res.status(404).send("Post couldn't be found")
    }
    // Respond with a JSON string of all users in the collection
    return res.status(200).send(post)
  }

export const savePost = async (req, res) => {
    await postsService.savePost(req.body);
    return res.status(201).json({msg: "post saved", post_id: doc._id})
}
