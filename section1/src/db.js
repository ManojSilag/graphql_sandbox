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

const db = {
  users,
  comments,
  posts
};

export { db as default };
