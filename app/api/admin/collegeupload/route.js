import connectDB from "@/lib/config/db"
import College from "@/lib/config/models/collegeModel"
import { NextResponse } from "next/server"

// Connect to the database
connectDB()

export async function POST(req) {
  try {
    console.log("Sending request for college upload")

    // Parse the incoming JSON body
    const { name, city, state, country, courseName, duration, fees, establishedYear } = await req.json()

    // Check if the college already exists
    const existingCollege = await College.findOne({ name })
    if (existingCollege) {
      return NextResponse.json({ error: "College already exists" }, { status: 400 })
    }

    // Validate input fields
    if (!name || !city || !state || !country || !courseName || !duration || !fees || !establishedYear) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Create a new college document
    const newCollege = new College({
      name,
      location: {
        city,
        state,
        country,
      },
      courses: [
        {
          name: courseName,
          duration,
          fees,
        },
      ],
      establishedYear,
    })

    // Save the new college to the database
    const savedCollege = await newCollege.save()

    console.log("College uploaded successfully:", savedCollege)

    // Return a success response
    return NextResponse.json({ message: "College uploaded successfully", college: savedCollege }, { status: 201 })
  } catch (error) {
    console.error("Error during college upload:", error)

    // Return an error response
    return NextResponse.json({ error: "College upload failed. Please try again." }, { status: 500 })
  }
}

