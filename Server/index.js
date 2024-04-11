const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGO_URL } = require("./config");
const { typeDefs } = require("./GraphQl/typeDefs");
const resolvers = require("./GraphQl/resolvers/index");

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo online");
    return server.listen({ port: 4000 });
  })
  .then((res) => console.log(`Server running at ${res.url}`));
