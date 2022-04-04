const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const http = require("http");
const path = require("path");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");

const mongoose = require("mongoose");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const API = require("./datasource");

const PORT = process.env.PORT || 4000;

require("dotenv").config();

const startApolloServer = async (typeDefs, resolvers) => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      return { token };
    },
    dataSources: () => ({
      api: new API(),
    }),
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(process.env.PORT);
      httpServer.listen({ port: PORT });
    })
    .catch((err) => {
      console.log(err);
    });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../client", "dist")));
    app.get("*", (_, res) => {
      res.sendFile(path.join(__dirname, "../../client", "dist", "index.html"));
    });
  }
};

startApolloServer(typeDefs, resolvers);
