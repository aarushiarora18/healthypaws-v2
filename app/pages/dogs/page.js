"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { Search, MapPin, Heart, SlidersHorizontal, PawPrint } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const DogsPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [dogs, setDogs] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch dogs data from API
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/dogs")
        setDogs(response.data)
      } catch (error) {
        console.error("Error fetching dogs data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDogs()
  }, [])

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  // Filter dogs based on search query and selected filter
  const filteredDogs = dogs.filter((dog) => {
    // Filter based on search query
    const matchesSearchQuery =
      dog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dog.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dog.location && dog.location.city.toLowerCase().includes(searchQuery.toLowerCase()))

    // Filter based on selected filter
    const matchesSelectedFilter =
      selectedFilter === "all" ||
      (selectedFilter === "small" && dog.size === "Small") ||
      (selectedFilter === "medium" && dog.size === "Medium") ||
      (selectedFilter === "large" && dog.size === "Large") ||
      (selectedFilter === "puppy" && dog.age <= 1) ||
      (selectedFilter === "adult" && dog.age > 1 && dog.age < 8) ||
      (selectedFilter === "senior" && dog.age >= 8)

    return matchesSearchQuery && matchesSelectedFilter
  })

  // Sample dogs data for initial rendering if API fails
  const sampleDogs = [
    {
      _id: "1",
      name: "Max",
      breed: "Golden Retriever",
      age: 3,
      size: "Large",
      gender: "Male",
      location: { city: "New York", state: "NY" },
      image: "/placeholder.svg?height=300&width=300",
      personality: ["Friendly", "Playful", "Energetic"],
      adoptionFee: 250,
      featured: true,
    },
    {
      _id: "2",
      name: "Bella",
      breed: "Beagle",
      age: 2,
      size: "Medium",
      gender: "Female",
      location: { city: "Los Angeles", state: "CA" },
      image: "/placeholder.svg?height=300&width=300",
      personality: ["Calm", "Affectionate"],
      adoptionFee: 200,
      featured: false,
    },
    {
      _id: "3",
      name: "Charlie",
      breed: "Poodle Mix",
      age: 5,
      size: "Small",
      gender: "Male",
      location: { city: "Chicago", state: "IL" },
      image: "/placeholder.svg?height=300&width=300",
      personality: ["Shy", "Affectionate"],
      adoptionFee: 175,
      featured: false,
    },
  ]

  // Use sample data if API fails or is empty
  const displayDogs = filteredDogs.length > 0 ? filteredDogs : loading ? [] : sampleDogs

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Dog</h1>
          <p className="mt-2 text-sm text-gray-600">Browse our available dogs and find your new best friend</p>
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search by dog name, breed, or location..."
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
            {["all", "small", "medium", "large", "puppy", "adult", "senior"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === filter ? "bg-primary-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dogs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayDogs.map((dog) => (
              <div
                key={dog._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <Image
                    src={dog.image || "/placeholder.svg?height=300&width=300"}
                    alt={dog.name}
                    className="w-full h-48 object-cover"
                    width={500}
                    height={192}
                  />
                  {dog.featured && (
                    <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900">{dog.name}</h3>
                    <div className="flex items-center">
                      <span className="text-sm bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                        {dog.age} {dog.age === 1 ? "year" : "years"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-gray-600">
                    <PawPrint className="h-4 w-4 mr-1" />
                    <span className="text-sm">{dog.breed}</span>
                  </div>
                  <div className="mt-2 flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {dog.location?.city}, {dog.location?.state}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {dog.personality &&
                      dog.personality.map((trait, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          {trait}
                        </span>
                      ))}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="font-medium text-primary-600">${dog.adoptionFee}</span>
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                      <Heart className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                  <Link href={`/pages/dogs/${dog._id}`}>
                    <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && displayDogs.length === 0 && (
          <div className="text-center py-12">
            <PawPrint className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No dogs found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DogsPage

