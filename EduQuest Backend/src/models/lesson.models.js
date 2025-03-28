import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema(
  {
    course: {
      // Course ID
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      // YouTube embed link
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Lesson = mongoose.model("Lesson", LessonSchema);
