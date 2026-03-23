"use strict";

/**
 * SOCIAL FEED SYSTEM STARTER
 *
 * Purpose:
 * Implement production-style core logic with clear contracts and predictable behavior.
 *
 * Learning Focus:
 * state transitions, composable helpers, and robust error handling
 *
 * Implementation Strategy:
 * 1. Define and validate input contracts first.
 * 2. Implement a minimal happy path end-to-end.
 * 3. Add edge-case handling and deterministic error messages.
 * 4. Keep pure logic separated from side effects.
 * 5. Export testable helpers and verify behavior with manual checks.
 */

/**
 * SOCIAL FEED STARTER
 *
 * Suggested design rules:
 * - Post IDs are unique and stable.
 * - Likes are idempotent per (postId, userId).
 * - Feed reads are deterministic and side-effect free.
 * - Delete operation enforces authorization by owner userId.
 */

function createPost(userId, content, timestamp = null) {
  // TODO: Create post object with unique ID, timestamp.
  // Steps:
  // 1) Validate userId and content.
  // 2) Assign deterministic ID strategy.
  // 3) Initialize likes/comments collections.
  // 4) Use timestamp arg or fallback to current time.
}

function addPost(posts, post) {
  // TODO: Add post to feed.
  // Validate shape, then return new posts array with appended post.
}

function likePost(posts, postId, userId) {
  // TODO: Add like to post.
  // Steps:
  // 1) Find post by ID and fail clearly if missing.
  // 2) Add userId to likes only if not already present.
  // 3) Return updated posts array immutably.
}

function commentPost(posts, postId, userId, comment) {
  // TODO: Add comment to post.
  // Steps:
  // 1) Validate comment text and userId.
  // 2) Build comment object with metadata (at/id optional).
  // 3) Append comment in stable order.
  // 4) Return updated posts array immutably.
}

function getFeed(posts, userId = null) {
  // TODO: Return chronological feed, optionally filtered by userId.
  // Steps:
  // 1) Filter by userId when provided.
  // 2) Sort by created timestamp newest-first.
  // 3) Return a copied structure to prevent caller mutation.
}

function deletePost(posts, postId, userId) {
  // TODO: Delete post if authorized.
  // Steps:
  // 1) Find target post and fail if missing.
  // 2) Ensure requester userId matches owner policy.
  // 3) Return posts array without target post.
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
