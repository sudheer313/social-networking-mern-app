const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      maxLength: [80, "Must be no more than 80 characters"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      maxLength: [800, "Must be no more than 800 characters"],
    },
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema);
