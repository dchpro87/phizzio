import mongoose from 'mongoose';

const userCommentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A User must have a name'],
    },
    userComment: {
      type: String,
      required: [true, 'Must send a comment'],
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A comment must come from a User'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const UserComment =
  mongoose.models.UserComment ||
  mongoose.model('UserComment', userCommentSchema);

export default UserComment;
