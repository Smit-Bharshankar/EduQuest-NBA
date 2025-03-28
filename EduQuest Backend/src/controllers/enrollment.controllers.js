import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Enrollment } from "../models/enrollment.models.js";
import { Course } from "../models/course.models.js";

// Enroll a user in a course
const enrollInCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user._id; // Assuming user info is available from auth middleware

  // Check if the course exists
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // Check if user is already enrolled
  const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
  if (existingEnrollment) {
    throw new ApiError(400, "User is already enrolled in this course");
  }

  const createdenrollment = new Enrollment({ user: userId, course: courseId });
  const enrollment = await enrollment.save();

  return res.status(201).json(new ApiResponse(201, enrollment, "User enrolled successfully"));
});

// Get all enrollments for a user
const getUserEnrollments = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const enrollments = await Enrollment.find({ user: userId }).populate("course");

  return res
    .status(200)
    .json(new ApiResponse(200, enrollments, "User enrollments fetched successfully"));
});

// Update progress in a course
const updateProgress = asyncHandler(async (req, res) => {
  const { enrollmentId } = req.params;
  const { progress } = req.body;

  if (progress < 0 || progress > 100) {
    throw new ApiError(400, "Progress must be between 0 and 100");
  }

  const enrollment = await Enrollment.findByIdAndUpdate(enrollmentId, { progress }, { new: true });

  if (!enrollment) {
    throw new ApiError(404, "Enrollment not found");
  }

  return res.status(200).json(new ApiResponse(200, enrollment, "Progress updated successfully"));
});

export { enrollInCourse, getUserEnrollments, updateProgress };
