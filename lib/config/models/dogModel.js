import mongoose from "mongoose"

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  breed: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
    enum: ["Small", "Medium", "Large", "Extra Large"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  description: {
    type: String,
    required: true,
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
      default: "United States",
    },
  },
  healthStatus: {
    vaccinated: {
      type: Boolean,
      default: false,
    },
    neutered: {
      type: Boolean,
      default: false,
    },
    microchipped: {
      type: Boolean,
      default: false,
    },
    specialNeeds: {
      type: Boolean,
      default: false,
    },
  },
  personality: [
    {
      type: String,
      enum: ["Friendly", "Playful", "Calm", "Energetic", "Shy", "Independent", "Affectionate", "Protective"],
    },
  ],
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
  adoptionFee: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: "/placeholder.svg?height=300&width=300",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  adoptionStatus: {
    type: String,
    enum: ["Available", "Pending", "Adopted"],
    default: "Available",
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

dogSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

const Dog = mongoose.models.Dog || mongoose.model("Dog", dogSchema)

export default Dog

