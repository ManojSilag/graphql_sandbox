import { v4 as uuidv4 } from "uuid";

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some((user) => user.email === args.data.email);
    if (emailTaken) {
      throw new Error("Email taken");
    }
    const user = {
      id: uuidv4(),
      ...args.data
    };
    db.users.push(user);
    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex((user) => user.id === args.id);
    if (userIndex === -1) {
      throw new Error("user Not Found");
    }

    const deletedUsers = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter((post) => {
      const match = post.author === args.id;
      if (match) {
        db.comments = db.comments.filter((comment) => {
          return comment.post !== post.id;
        });
      }
      return !match;
    });

    db.comments = db.comments.filter((comment) => {
      comment.author !== args.id;
    });

    return deleteddbUsers[0];
  },
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.users.find((user) => user.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    if (typeof data.email === "string") {
      const emailTaken = db.users.some((user) => user.email === data.email);

      if (emailTaken) {
        throw new Error("Email taken");
      }

      user.email = data.email;
    }

    if (typeof data.name === "string") {
      user.name = data.name;
    }

    if (typeof data.age !== "undefined") {
      user.age = data.age;
    }

    return user;
  },

  createPost(parent, args, { db }, info) {
    console.log("dev: createPost -> args", args);
    const userExist = db.users.some((user) => user.id === args.data.author);
    if (!userExist) {
      throw new Error("User Not Found");
    }
    const post = {
      id: uuidv4(),
      ...args.data
    };
    db.posts.push(post);
    return post;
  },
  deletePost(parent, args, { db }, info) {
    const PostIndex = db.posts.findIndex((post) => post.id === args.id);
    if (PostIndex === -1) {
      throw new Error("Post Not Found");
    }
    const deletedposts = db.posts.splice(PostIndex, 1);
    db.comments = db.comments.filter((comment) => {
      return comment.post !== args.id;
    });

    return deletedposts[0];
  },
  updatePost(parent, args, { db }, info) {
    const { id, data } = args;
    const post = db.posts.find((post) => post.id === id);
    if (!post) {
      throw new Error("Post Not Found");
    }
    if (typeof data.title === "string") {
      post.title = data.title;
    }
    if (typeof data.body === "string") {
      post.body = data.body;
    }
    if (typeof data.published === "boolean") {
      post.published = data.published;
    }
    return post;
  },

  createComment(parent, args, { db }, info) {
    const userExist = db.users.some((user) => user.id === args.data.author);
    if (!userExist) {
      throw new Error("User not found");
    }
    const postExistansPublished = db.posts.some((post) => {
      const postId = post.id;
      const postPublished = post.published;
      return postPublished && args.data.post === postId;
    });
    if (!postExistansPublished) {
      throw new Error("Post not found");
    }
    const comment = {
      id: uuidv4(),
      ...args.data
    };
    db.comments.push(comment);
    return comment;
  },

  updateComment(parent, args, { db }, info) {
    const { id, data } = args;
    const comment = db.comments.find((comment) => comment.id === id);
    if (!comment) {
      throw new Error("Comment Not Found");
    }

    if (typeof data.text === "string") {
      comment.text = data.text;
    }

    return comment;
  },

  deleteComment(parent, args, { db }, info) {
    const CommentIndex = db.comments.findIndex(
      (comment) => comment.id === args.id
    );
    if (CommentIndex === -1) {
      throw new Error("Comment Not Found");
    }
    const deletedcomments = db.comments.splice(CommentIndex, 1);
    return deletedcomments[0];
  }
};

export { Mutation as default };
