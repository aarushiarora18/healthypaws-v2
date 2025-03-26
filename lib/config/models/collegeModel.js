const mongoose = require("mongoose")

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "India",
    },
  },
  courses: [
    {
      name: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true, // e.g., "4 years", "2 years"
      },
      fees: {
        type: Number,
        required: true, // Fees in your chosen currency
      },
    },
  ],
  rankings: {
    national: {
      type: Number, // National ranking
      default: null,
    },
    international: {
      type: Number, // International ranking
      default: null,
    },
  },
  reviews: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to user model
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5, // Rating between 1 and 5
      },
      comment: {
        type: String,
        trim: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  establishedYear: {
    type: Number,
    required: true,
  },
  facilities: {
    library: {
      type: Boolean,
      default: false,
    },
    sports: {
      type: Boolean,
      default: false,
    },
    hostels: {
      type: Boolean,
      default: false,
    },
    labs: {
      type: Boolean,
      default: false,
    },
    wifi: {
      type: Boolean,
      default: false,
    },
  },
  image: {
    type: String, // URL for the college image
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

collegeSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

const College = mongoose.models.College || mongoose.model("College", collegeSchema)

module.exports = College

