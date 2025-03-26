"use client"
import { useEffect, useState } from "react"
import axios from "axios" // Import axios
import { Search, MapPin, Star, Users, ArrowUpRight, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const OnboardingPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [colleges, setColleges] = useState([]) // State to hold fetched colleges data

  // Fetch colleges data from API
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get("/api/collegefetch") // Adjust the URL to your actual API endpoint
        setColleges(response.data)
      } catch (error) {
        console.error("Error fetching colleges data:", error)
      }
    }

    fetchColleges()
  }, [])

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  // Filter colleges based on search query and selected filter
  const filteredColleges = colleges.filter((college) => {
    // Filter based on search query
    const matchesSearchQuery =
      college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.address.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter based on selected filter
    const matchesSelectedFilter =
      selectedFilter === "all" ||
      (selectedFilter === "featured" && college.featured) ||
      (selectedFilter === "top-rated" && college.rating >= 4.5) ||
      (selectedFilter === "research" && college.tags.includes("Research")) ||
      (selectedFilter === "engineering" && college.tags.includes("Engineering")) ||
      (selectedFilter === "arts" && college.tags.includes("Arts"))

    return matchesSearchQuery && matchesSelectedFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect College</h1>
          <p className="mt-2 text-sm text-gray-600">Discover top institutions that match your aspirations</p>
        </div>
      </header>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by college name or location..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="h-5 w-5" />
            Filters
          </button>
        </div>

        {/* Filter Tags */}
        {showFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            {["all", "featured", "top-rated", "research", "engineering", "arts"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === filter ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* College Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college) => (
            <div
              key={college.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <Image
                  src={
                    college.image || "https://www.highereducationdigest.com/wp-content/uploads/2021/12/2-550x330.jpg"
                  } // Fallback to default image
                  alt={college.name}
                  className="w-full h-48 object-cover"
                  width={500} // Set appropriate dimensions
                  height={192}
                />
                {college.featured && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-900">{college.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-700">{college.rating || 4.5}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{college.location.city}</span>
                </div>
                <div className="mt-4 flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="text-sm">{college.studentCount || 5000} Students</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {college.tags && Array.isArray(college.tags) ? (
                    college.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No tags available</span> // fallback message
                  )}
                </div>
                <Link href={`/pages/collegeinfo/${colleges.name}`}>
                  <button className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600">© 2024 College Finder. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Contact
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default OnboardingPage

