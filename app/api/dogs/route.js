import connectDB from "@/lib/config/db"
import Dog from "@/lib/config/models/dogModel"
import { NextResponse } from "next/server"

// Connect to the database
connectDB()

export async function GET(req) {
  try {
    const dogs = await Dog.find({ adoptionStatus: "Available" })
    return NextResponse.json(dogs, { status: 200 })
  } catch (error) {
    console.error("Error fetching dogs:", error)
    return NextResponse.json({ error: "Failed to fetch dogs" }, { status: 500 })
  }
}

// For admin use - to add new dogs
export async function POST(req) {
  try {
    // Check authorization (should implement proper auth middleware)
    // This is a simplified example

    const dogData = await req.json()

    const newDog = new Dog(dogData)
    const savedDog = await newDog.save()

    return NextResponse.json({ message: "Dog added successfully", dog: savedDog }, { status: 201 })
  } catch (error) {
    console.error("Error adding dog:", error)
    return NextResponse.json({ error: "Failed to add dog" }, { status: 500 })
  }
}

