import { GraphQLServer } from "graphql-yoga";

const typedefs = `
   type Query {
       hello: String!
       name: String!
       loaction: String!
       bio: String!
   }
`;
const resolvers = {
  Query: {
    hello() {
      return "Hello world from Manoj...";
    },
    name() {
      return "silag Manoj";
    },
    loaction() {
      return "Ahmednagar";
    },
    bio() {
      return "Software Developer";
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
