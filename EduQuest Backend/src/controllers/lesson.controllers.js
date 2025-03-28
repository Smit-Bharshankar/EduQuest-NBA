import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Lesson } from "../models/lesson.models.js";
import { Course } from "../models/course.models.js";

// Create a new lesson
const createLesson = asyncHandler(async (req, res) => {
  try {
    const { courseId, title, videoUrl, description } = req.body;

    // Ensure course exists before adding a lesson
    const course = await Course.findById(courseId);
    if (!course) {
      throw new ApiError(400, " course not found ");
    }

    const createdlesson = new Lesson({ course: courseId, title, videoUrl, description });
    const lesson = await createdlesson.save();

    if (!lesson) {
      throw new ApiError(400, " Couldnt add lesson to Course  ");
    }
    // Optionally add the lesson reference to the course
    if (lesson) {
      course.lesson.push(lesson._id);
      await course.save();
    }

    return res.status(201).json(new ApiResponse(201, lesson, "Lesson created successfully"));
  } catch (error) {
    throw new ApiError(400, " Failed to create Lesson: " + error.message);
  }
});

// Get all lessons for a specific course
const getLessonsByCourse = asyncHandler(async (req, res) => {
  try {
    const { courseId } = req.params;

    const lessons = await Lesson.find({ course: courseId });

    if (!lessons) {
      throw new ApiError(400, "Couldnt find lessons");
    }

    return res.status(200).json(new ApiResponse(200, lessons, "Lessons fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Error fetching lessons : " + error.message);
  }
});

// Get a single lesson by ID
const getLessonById = asyncHandler(async (req, res) => {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      throw new ApiError(400, "Couldnt find lessons");
    }

    return res.status(200).json(new ApiResponse(200, lesson, "A Lesson  fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Error fetching lessons : " + error.message);
  }
});

// Update a lesson
const updateLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { title, videoUrl, description } = req.body;

    const lesson = await Lesson.findByIdAndUpdate(
      lessonId,
      { title, videoUrl, description },
      { new: true }
    );

    if (!lesson) {
      throw new ApiError(400, "Couldnt find lessons");
    }

    return res.status(200).json(new ApiResponse(200, lesson, "Lesson updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Error updating lessons : " + error.message);
  }
};

// Delete a lesson
const deleteLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findByIdAndDelete(lessonId);

    if (!lesson) {
      throw new ApiError(400, "Couldnt find lessons");
    }

    // Remove the lesson from the course
    const deletedLesson = await Course.updateOne(
      { _id: lesson.course },
      { $pull: { lessons: lessonId } }
    );

    return res.status(200).json(new ApiResponse(200, deletedLesson, "Lesson deleted successfully"));
  } catch (error) {
    throw new ApiError(500, "Error deleting lessons : " + error.message);
  }
};

export { deleteLesson, updateLesson, getLessonById, getLessonsByCourse, createLesson };
