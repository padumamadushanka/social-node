const express = require("express");
const {
  getPosts,
  createPost,
  postsByUser,
  postById,
  isPoster,
  deletePost,
  updatePost,
  photo,
  singlePost,
  like,
  unlike,
  comment,
  uncomment,
  updateComment
} = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
//when the name is index it will auto load in validator folder
const { createPostValidator } = require("../validator");
const router = express.Router();

// like unlike
router.put("/post/like", requireSignin, like);
router.put("/post/unlike", requireSignin, unlike);

// comments
router.put("/post/comment", requireSignin, comment);
router.put("/post/uncomment", requireSignin, uncomment);
router.put("/post/updatecomment", requireSignin, updateComment);

router.get("/posts", getPosts);
//formidable package should run before validate post otherwise createPostValidator will return validation errors it will take some time to process formidable
router.post(
  "/post/new/:userId",
  requireSignin,
  createPost,
  createPostValidator
);
router.get("/posts/by/:userId", requireSignin, postsByUser);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.get("/post/:postId", singlePost);

// photo
router.get("/post/photo/:postId", photo);

//when url contains userId param userById method will get executed and available profile in request
router.param("userId", userById);
//when url contains postId param postById method will get executed and available post in request
router.param("postId", postById);

module.exports = router;
