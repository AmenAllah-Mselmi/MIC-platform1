import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

// User Schema
const UserSchema = new Schema({
  NomPrenom: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
  Role: {
    type: String,
    enum: ["super_admin", "member", "instructor"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  Adresse: {
    type: String,
    required: true,
  },
  ImageLink: {
    type: String,
  },
});

// Pre-save hook for hashing passwords
UserSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// User model
export const User = mongoose.model("User", UserSchema);

// Instructor Schema
const InstructorSchema = new Schema({
  Departement: {
    type: String,
    enum: ["Basic", "Intermediate", "Advanced"],
  },
});

// Member Schema
const MemberSchema = new Schema({
  Departement: {
    type: String,
    enum: ["Basic", "Intermediate", "Advanced"],
  },
});

// Discriminators for different user roles
export const Instructor = User.discriminator("Instructor", InstructorSchema);
export const SuperAdmin = User.discriminator("SuperAdmin", new Schema({}));
export const Member = User.discriminator("Member", MemberSchema);
