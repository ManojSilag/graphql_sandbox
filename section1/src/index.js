import { GraphQLServer } from "graphql-yoga";
import db from "./db.js";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";

// const resolvers = {
//   Query,
//   Mutation,
//   User,
//   Post,
//   Comment
// };

const server = new GraphQLServer({
  typeDefs: `./src/schema.graphql`,
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment
  },
  context: {
    db: db
  }
});

server.start(() => {
  console.log("Server is up...");
});
