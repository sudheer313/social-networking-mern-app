const User = require("../models/User");
const { ApolloError, AuthenticationError } = require("apollo-server-express");
const bcryptjs = require("bcryptjs");
const { signToken } = require("../utils/auth");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const resolvers = {
  Query: {
    helloWorld: (parent, args, context) => {
      if (context.user) {
        return "hello Wrorld";
      }
      throw new ApolloError(
        "you are not authorised to access this resource, please authenticate"
      );
    },
    getAllUsers: async (parent, args) => {
      try {
        return await User.find();
      } catch (error) {
        throw new ApolloError("error.message");
      }
    },
    getUser: async (parent, { userId }) => {
      try {
        return await User.findOne({ _id: userId });
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
    getAllPosts: async (parent, args) => {
      try {
        return await Post.find();
      } catch (error) {
        throw new ApolloError("error.message");
      }
    },

    getPost: async (_, { postId }) => {
      try {
        return await Post.findOne({ _id: postId });
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
    getAllTrendingPosts: async (parent, args) => {
      try {
        return await Post.find().sort({ likesCount: -1 });
      } catch (error) {
        throw new ApolloError("error.message");
      }
    },
    getComments: async (parent, { postId }) => {
      try {
        return await Comment.find({
          postId,
        });
      } catch (error) {
        throw new ApolloError("error.message");
      }
    },
    getPostBysearch: async (parent, { searchQuery }) => {
      try {
        return await Post.find({
          title: { $regex: searchQuery, $options: "i" },
        });
      } catch (error) {
        throw new ApolloError("error.message");
      }
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
    addPost: async (parent, { title, description }, context) => {
      if (context.user) {
        try {
          const post = await Post.create({
            authorId: context.user._id,
            title,
            description,
          });
          await User.findByIdAndUpdate(context.user._id, {
            $inc: { postsCount: 1 },
          });
          return post;
        } catch (error) {
          throw new ApolloError(error.message);
        }
      }
      throw new ApolloError(
        "you are not authorised to create this resource, please authenticate"
      );
    },
    likePost: async (parent, { postId }, context) => {
      if (context.user) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(postId, {
            $addToSet: { likes: context.user._id },
            $pull: { dislikes: context.user._id },
            $inc: { likesCount: 1 },
          });

          console.log(updatedPost);
          return updatedPost;
        } catch (error) {
          throw new ApolloError(error.message);
        }
      }
      throw new ApolloError(
        "you are not authorised to like this post, please authenticate"
      );
    },
    dislikePost: async (parent, { postId }, context) => {
      if (context.user) {
        try {
          const post = await Post.findById(postId);
          const updatedPost = await Post.findByIdAndUpdate(postId, {
            $addToSet: { dislikes: context.user._id },
            $pull: { likes: context.user._id },
            $inc: { likesCount: post.likesCount === 0 ? 0 : -1 },
          });
          console.log(updatedPost);
          return updatedPost;
        } catch (error) {
          throw new ApolloError(error.message);
        }
      }
      throw new ApolloError(
        "you are not authorised to dislike this post, please authenticate"
      );
    },
    deletePost: async (parent, { postId }, context) => {
      if (context.user) {
        try {
          const post = await Post.findById(postId);
          if (!post) {
            throw new ApolloError("post doesnot exists");
          }
          if (post.authorId == context.user._id) {
            const deletePost = await Post.findByIdAndDelete(postId);

            await User.findByIdAndUpdate(context.user._id, {
              $inc: { postsCount: -1 },
            });
            return deletePost;
          }

          throw new ApolloError(
            "you are not authorised to delete this post,only owner can delete it"
          );
        } catch (error) {
          throw new ApolloError(error.message);
        }
      }
      throw new ApolloError(
        "you are not authorised to delete this post, please authenticate"
      );
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
    addComment: async (_, { postId, description }, context) => {
      if (context.user) {
        try {
          const comment = await Comment.create({
            authorId: context.user._id,
            postId,
            description,
          });
          return comment;
        } catch (error) {
          throw new ApolloError(error.message);
        }
      }
      throw new ApolloError(
        "you are not authorised to create this resource, please authenticate"
      );
    },
    deleteComment: async (parent, { commentId }, context) => {
      if (context.user) {
        try {
          const comment = await Comment.findById(commentId);
          if (!comment) {
            throw new ApolloError("comment does not exists");
          }
          if (comment.authorId == context.user._id) {
            const deleteComment = await Comment.findByIdAndDelete(commentId);
            return deleteComment;
          }

          throw new ApolloError(
            "you are not authorised to delete this post,only owner can delete it"
          );
        } catch (error) {
          throw new ApolloError(error.message);
        }
      }
      throw new ApolloError(
        "you are not authorised to delete this post, please authenticate"
      );
    },
    followUser: async (parent, { followUserId }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            {
              $addToSet: { followingUsers: followUserId },
            },
            { new: true }
          );

          await User.findByIdAndUpdate(followUserId, {
            $inc: { followers: 1 },
          });
          return updatedUser;
        } catch (error) {
          throw new ApolloError(error.message);
        }
      }
      throw new ApolloError(
        "you are not authorised to create this user, please authenticate first"
      );
    },
    unfollowUser: async (parent, { unfollowUserId }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            {
              $pull: { followingUsers: unfollowUserId },
            },
            { new: true }
          );

          await User.findByIdAndUpdate(unfollowUserId, {
            $inc: { followers: -1 },
          });
          return updatedUser;
        } catch (error) {
          throw new ApolloError(error.message);
        }
      }
      throw new ApolloError(
        "you are not authorised to unfolloe this user, please authenticate first"
      );
    },
  },
};

module.exports = resolvers;
