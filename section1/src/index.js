import { GraphQLServer } from "graphql-yoga";

const typedefs = `
  type Query{
    name: String!
    isAuthenticated: Boolean!
    age: Int!
    sgpa: Float
    key: ID!
  }
`;

const resolvers = {
  Query: {
    name() { return "Manoj"},
    isAuthenticated(){ return false},
    age(){ return 24 },
    sgpa(){ return },
    key(){ return 'fdsfsd12322'}
  }
};

const server = new GraphQLServer({
  typeDefs: typedefs,
  resolvers: resolvers
});

server.start(() => {
  console.log("Server is up...");
});
