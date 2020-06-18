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
    published: false
  },
  {
    id: "2",
    title: "dom",
    body: "Once upon time a person named dom",
    published: true
  },
  {
    id: "3",
    title: "worn",
    body: "The story of worn",
    published: false
  },
  {
    id: "4",
    title: "the king",
    body: "Queen the one and",
    published: true
  }
];

const typedefs = `
  type Query
  {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    Post: Post!
  }

  type User {
    name: String!
    id: ID!
    email: String!
    age: Int
  }

  type Post{
    id: ID!
    title: String!
    body: String!
    published: Boolean!
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
