import dbConnect from "@/lib/config/dbConnect" // Utility to connect to your database
import College from "@/lib/config/models/collegeModel" // College model

export default async function handler(req, res) {
  await dbConnect() // Ensure a database connection

  const { name } = req.query

  try {
    const college = await College.findOne({ name: name }) // Query the database by college name

    if (college) {
      res.status(200).json(college)
    } else {
      res.status(404).json({ message: "College not found" })
    }
  } catch (error) {
    console.error("Error fetching college:", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

