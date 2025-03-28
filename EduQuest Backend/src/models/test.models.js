import mongoose from "mongoose";

const TestSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    questions: [
      {
        questionText: { type: String, required: true },
        options: [{ type: String, required: true }], // Multiple choices
        correctAnswer: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Test = mongoose.model("Test", TestSchema);
