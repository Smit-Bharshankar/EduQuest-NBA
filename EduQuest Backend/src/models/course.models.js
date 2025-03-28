import mongoose, { Schema } from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    lesson: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    test: {
      type: Schema.Types.ObjectId,
      ref: "Test",
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", CourseSchema);
