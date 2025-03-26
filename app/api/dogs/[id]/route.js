import connectDB from "@/lib/config/db"
import Dog from "@/lib/config/models/dogModel"
import { NextResponse } from "next/server"

// Connect to the database
connectDB()

export async function GET(req, { params }) {
  try {
    const { id } = params

    const dog = await Dog.findById(id)

    if (!dog) {
      return NextResponse.json({ error: "Dog not found" }, { status: 404 })
    }

    return NextResponse.json(dog, { status: 200 })
  } catch (error) {
    console.error("Error fetching dog:", error)
    return NextResponse.json({ error: "Failed to fetch dog details" }, { status: 500 })
  }
}

// Update dog information (admin only)
export async function PUT(req, { params }) {
  try {
    const { id } = params
    const updateData = await req.json()

    // Should implement proper authorization here

    const updatedDog = await Dog.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })

    if (!updatedDog) {
      return NextResponse.json({ error: "Dog not found" }, { status: 404 })
    }

    return NextResponse.json(updatedDog, { status: 200 })
  } catch (error) {
    console.error("Error updating dog:", error)
    return NextResponse.json({ error: "Failed to update dog" }, { status: 500 })
  }
}

// Delete a dog (admin only)
export async function DELETE(req, { params }) {
  try {
    const { id } = params

    // Should implement proper authorization here

    const deletedDog = await Dog.findByIdAndDelete(id)

    if (!deletedDog) {
      return NextResponse.json({ error: "Dog not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Dog deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting dog:", error)
    return NextResponse.json({ error: "Failed to delete dog" }, { status: 500 })
  }
}

