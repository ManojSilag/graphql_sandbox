import { GraphQLServer } from "graphql-yoga";

//Demo user data
const users = [
  {
    id: "1",
    name: "Manoj",
    email: "manoj@example.com",
    age: 12
  },
  {
    id: "2",
    name: "sarah",
    email: "sarah@example.com"
  },
  {
    id: "3",
    name: "vinod",
    email: "vinod@example.com",
    age: 23
  },
  {
    id: "4",
    name: "nik",
    email: "nik@example.com"
  }
];

const posts = [
  {
    id: "1",
    title: "a life in boat",
    body: "This is a story of boat",
    published: false,
    author: "3"
  },
  {
    id: "2",
    title: "dom",
    body: "Once upon time a person named dom",
    published: true,
    author: "2"
  },
  {
    id: "3",
    title: "worn",
    body: "The story of worn",
    published: false,
    author: "1"
  },
  {
    id: "4",
    title: "the king",
    body: "Queen the one and",
    published: true,
    author: "4"
  }
];

const comments = [
  {
    id: "1",
    text: "Very good",
    author: "2",
    post: "1"
  },
  {
    id: "2",
    text: "LOl",
    author: "4",
    post: "2"
  },
  {
    id: "3",
    text: "Keep Going Loved the article!!",
    author: "3",
    post: "3"
  },
  {
    id: "4",
    text: "AWww so cute....!",
    author: "2",
    post: "4"
  }
];

const typedefs = `
  type Query
  {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]
    me: User!
    Post: Post!
  }

  type User {
    name: String!
    id: ID!
    email: String!
    age: Int
    posts: [Post!]!
    comments:[Comment!]! 
  }

  type Post{
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments:[Comment!]!
  }

  type Comment{
    id:ID!
    text: String!
    author: User!
    post: Post!
  }
`;

const resolvers = {
  Query: {
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
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      } else {
        return users.filter((user) => {
          return user.name.toLowerCase().includes(args.query.toLowerCase());
        });
      }
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      } else {
        return posts.filter((post) => {
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
    comments(parent, args, ctx, info) {
      return comments;
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post;
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: typedefs,
  resolvers: resolvers
});

server.start(() => {
  console.log("Server is up...");
});
