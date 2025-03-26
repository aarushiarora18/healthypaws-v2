import connectDB from "@/lib/config/db"
import College from "@/lib/config/models/collegeModel"
import { NextResponse } from "next/server"

// Connect to the database
connectDB()

export async function GET(req) {
  try {
    const colleges = await College.find()
    return NextResponse.json(colleges, { status: 200 })
  } catch (error) {
    console.error("Error fetching colleges:", error)
    return NextResponse.json({ error: "Failed to fetch colleges" }, { status: 500 })
  }
}

// Mock data for colleges
// const colleges = [
//     {
//         id: 1,
//         name: "Bennett University",
//         address: "Greater Noida, Uttar Pradesh, India",
//         rating: 4.0,
//         studentCount: "10,000",
//         image: "https://www.highereducationdigest.com/wp-content/uploads/2021/12/2-550x330.jpg",
//         tags: ["Research", "Engineering", "Arts"],
//         featured: true
//     },
//     {
//         id: 2,
//         name: "Indian Institute of Technology",
//         address: "Bombay, Maharastra, India",
//         rating: 5.0,
//         studentCount: "5000",
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh1QeSCfOMamo7zdIUCMetskJr-tMI4IMTVg&s",
//         tags: ["Technology", "Science", "Innovation"],
//         featured: true
//     },
//     {
//         id: 3,
//         name: "Harvard University",
//         address: "Cambridge, MA 02138, United States",
//         rating: 4.9,
//         studentCount: "23,731",
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcBPzsOSMoi7eFUwZOkaX06sx7qtpdsE52jg&s",
//         tags: ["Liberal Arts", "Research", "Law"],
//         featured: false
//     },
//     {
//       id: 1,
//       name: "Stanford University",
//       address: "Stanford, CA 94305, United States",
//       rating: 4.8,
//       studentCount: "16,937",
//       image: "https://assets.simpleviewinc.com/simpleview/image/upload/crm/sanmateoca/shutterstock_4189008910-9b68011a5056a36_9b6802fa-5056-a36a-0bbb53c8e971b411.jpg",
//       tags: ["Research", "Engineering", "Arts"],
//       featured: false
//   },
//   {
//       id: 2,
//       name: "Massachusetts Institute of Technology",
//       address: "Cambridge, MA 02139, United States",
//       rating: 4.9,
//       studentCount: "11,376",
//       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpKBwnxzxpuCJ1TZyTjEHYxvObYO5UqQE_-A&s",
//       tags: ["Technology", "Science", "Innovation"],
//       featured: false
//   },
//   {
//       id: 3,
//       name: "National Institute of Technology",
//       address: "Delhi, India",
//       rating: 4.9,
//       studentCount: "23,731",
//       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf-CfBc6BV4m6hFj-WCmy4cqEF5yKlViHv9g&s",
//       tags: ["Liberal Arts", "Research", "Law"],
//       featured: false
//   },
//     // Add more colleges as needed
// ];

