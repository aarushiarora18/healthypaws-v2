import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      //required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    preferences: {
      dogSize: {
        type: [String],
        enum: ["Small", "Medium", "Large", "Extra Large"],
        default: [],
      },
      dogAge: {
        type: [Number],
        default: [],
      },
      goodWith: {
        children: {
          type: Boolean,
          default: false,
        },
        dogs: {
          type: Boolean,
          default: false,
        },
        cats: {
          type: Boolean,
          default: false,
        },
      },
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dog",
      },
    ],
    applications: [
      {
        dogId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Dog",
        },
        status: {
          type: String,
          enum: ["Pending", "Approved", "Rejected"],
          default: "Pending",
        },
        submittedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User

