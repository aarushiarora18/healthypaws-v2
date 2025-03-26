"use client"

// const CollegeInfo = () => {
//   return (
//     <div>CollegeInfo</div>
//   )
// }

// export default CollegeInfo

import { useRouter } from "next/router"
import axios from "axios"
import { useEffect, useState } from "react"
import Image from "next/image"

const CollegeDetails = () => {
  const router = useRouter()
  const { establishedYear } = router.query // Get the dynamic parameter
  const [college, setCollege] = useState(null)

  // Fetch specific college data
  useEffect(() => {
    if (establishedYear) {
      const fetchCollege = async () => {
        try {
          const response = await axios.get(`/api/collegefetch/${establishedYear}`) // Fetch data using the college name
          setCollege(response.data)
        } catch (error) {
          console.error("Error fetching college details:", error)
        }
      }

      fetchCollege()
    }
  }, [establishedYear])

  // Handle loading state
  if (!college) {
    return <p>Loading...</p>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative">
            <Image
              src={college.image}
              alt={college.name}
              className="w-full h-64 object-cover"
              width={1200}
              height={300}
            />
            {college.featured && (
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </div>
            )}
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900">{college.name}</h1>
            <p className="mt-2 text-gray-600">{college.address}</p>
            <div className="mt-4 flex items-center text-gray-600">
              <span className="text-sm">Rating: {college.rating}</span>
            </div>
            <div className="mt-4 flex items-center text-gray-600">
              <span className="text-sm">{college.studentCount} Students</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {college.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollegeDetails

