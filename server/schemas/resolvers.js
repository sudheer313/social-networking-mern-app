const User = require("../models/User");
const { ApolloError, AuthenticationError } = require("apollo-server-express");
const bcryptjs = require("bcryptjs");
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    helloWorld: () => {
      return "hello World";
    },
  },
  Mutation: {
    registerUser: async (_, { username, email, password }) => {
      // check if user exixts
      const user = await User.findOne({ email });
      if (user) {
        throw new ApolloError("User already exists with this e-mail");
      }
      const hashedPassword = await bcryptjs.hash(password, 10);

      // Add user to the db
      try {
        const newUser = await User.create({
          username,
          email,
          password: hashedPassword,
        });

        //Generate Token
        const token = signToken(newUser);

        return {
          _id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          token,
        };
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      // compare the incoming password with the hashed password
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        throw new AuthenticationError("Invalid password credintials");
      }

      //Generate Token
      const token = signToken(user);

      return {
        _id: user.id,
        username: user.username,
        email: user.email,
        token,
      };
    },
  },
};

module.exports = resolvers;
