const Query = {
  me() {
    return {
      name: "Manoj",
      id: "ABCDEFG",
      email: "manoj@SpeechGrammarList.com",
      age: 12
    };
  },
  Post() {
    return {
      id: "ABCDEFG",
      title: "The way you lie",
      body: "Loreum ispum ",
      published: false
    };
  },
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    } else {
      return db.users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    }
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    } else {
      return db.posts.filter((post) => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    }
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  }
};

export { Query as default };
