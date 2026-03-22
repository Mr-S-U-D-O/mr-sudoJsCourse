"use strict";

function createPost(userId, content, timestamp = null) {
  // TODO: Create post object with unique ID, timestamp
}

function addPost(posts, post) {
  // TODO: Add post to feed
}

function likePost(posts, postId, userId) {
  // TODO: Add like to post
}

function commentPost(posts, postId, userId, comment) {
  // TODO: Add comment to post
}

function getFeed(posts, userId = null) {
  // TODO: Return chronological feed, optionally filtered by userId
}

function deletePost(posts, postId, userId) {
  // TODO: Delete post if authorized
}

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Social Feed System",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createPost,
  addPost,
  likePost,
  commentPost,
  getFeed,
  deletePost,
  createProject,
};
