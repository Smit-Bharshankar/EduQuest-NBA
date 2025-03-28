import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Lesson } from "../models/lesson.models.js";
import { Course } from "../models/course.models.js";

// Create a new course
const createCourse = asyncHandler(async (req, res) => {
  const { title, description, instructor, category } = req.body;

  if (!title || !description || !instructor || !category) {
    throw new ApiError(400, "All fields are required");
  }

  const createdcourse = new Course({ title, description, instructor, category });
  const course = await createdcourse.save();

  return res.status(201).json(new ApiResponse(201, course, "Course created successfully"));
});

// Get all courses
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();

  if (!courses) {
    throw new ApiError(400, "No Courses available");
  }

  return res.status(200).json(new ApiResponse(200, courses, "Courses fetched successfully"));
});

// Get a single course by ID
const getCourseById = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId).populate("lesson");
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  return res.status(200).json(new ApiResponse(200, course, "Course fetched successfully"));
});

// Update a course
const updateCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { title, description, instructor, category } = req.body;

  const course = await Course.findByIdAndUpdate(
    courseId,
    { title, description, instructor, category },
    { new: true }
  );

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  return res.status(200).json(new ApiResponse(200, course, "Course updated successfully"));
});

// Delete a course
const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findByIdAndDelete(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  return res.status(200).json(new ApiResponse(200, null, "Course deleted successfully"));
});

export { createCourse, getCourses, getCourseById, updateCourse, deleteCourse };
