import db from "./db";
import * as activitiesAPI from "./activities";
import * as notificationsAPI from "./notifications";
import * as APIAuth from "./helpers/api-auth";

export async function getLikes(postId) {
  return db.likes.filter(like => like.postId === postId);
}

export async function unlike(sessionId, postId) {
  return await APIAuth.validate(sessionId, unlike, postId);

  function unlike(userId, postId) {
    const user = db.users.find(user => user.id === userId);
    const likes = user.likes;

    //Decrement likeCount on post
    db.posts = db.posts.map(
      post =>
        post.id === postId ? { ...post, likeCount: post.likeCount - 1 } : post
    );

    //remove like from likes table
    db.likes = db.likes.filter(
      like => like.postId !== postId || like.userId !== userId
    );

    //Update likes on user table
    const userLikes = likes.replace(postId, "");

    db.users = db.users.map(
      u => (u.userId === userId ? { ...u, likes: userLikes } : u)
    );

    activitiesAPI.unlike(userId, postId);

    return {
      likes: db.likes.filter(like => like.postId === postId),
      likeCount: db.posts.find(post => post.id === postId).likeCount,
      userLikes
    };
  }
}

export async function like(sessionId, postId) {
  return await APIAuth.validate(sessionId, like, postId);

  function like(userId, postId) {
    const user = db.users.filter(user => user.id === userId);
    const likes = user.likes;
    //Increment likeCount on post
    db.posts = db.posts.map(
      post =>
        post.id === postId ? { ...post, likeCount: post.likeCount + 1 } : post
    );

    //add like to likes table
    db.likes = db.likes.concat({ userId, postId });

    //Update likes on user table
    const userLikes = likes + "," + postId;

    db.users = db.users.map(
      u => (u.userId === userId ? { ...u, likes: userLikes } : u)
    );

    activitiesAPI.like(userId, postId);

    return {
      likes: db.likes.filter(like => like.postId === postId),
      likeCount: db.posts.find(post => post.id === postId).likeCount,
      userLikes
    };
  }
}
