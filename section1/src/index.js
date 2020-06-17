import { GraphQLServer } from "graphql-yoga";

const typedefs = `
  type Query{
    add(num1: Float, num2: Float ): Float!
    greeting(name: String, job: String): String!
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
    greeting(parent, args, ctx, info) {
      // console.log(args);
      if (args.name && args.job) {
        return `Heloooooo ${args.name}! YOur job is ${args.job}`;
      } else {
        return "Hellooooo";
      }
    },
    add(parent, args) {
      const num1 = args.num1;
      const num2 = args.num2;
      return (num1 + num2);
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
