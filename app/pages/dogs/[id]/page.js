"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Heart, MapPin, Calendar, PawPrint, Check, X, ArrowLeft, Share2 } from "lucide-react"

const DogDetailsPage = () => {
  const params = useParams()
  const router = useRouter()
  const [dog, setDog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDog = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/dogs/${params.id}`)
        setDog(response.data)
      } catch (error) {
        console.error("Error fetching dog details:", error)
        setError("Failed to load dog details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchDog()
    }
  }, [params.id])

  // Sample dog data for initial rendering if API fails
  const sampleDog = {
    _id: params.id,
    name: "Max",
    breed: "Golden Retriever",
    age: 3,
    size: "Large",
    gender: "Male",
    description:
      "Max is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. He's great with children and other dogs, and is looking for an active family who can give him plenty of exercise and attention.",
    location: { city: "New York", state: "NY", country: "United States" },
    healthStatus: {
      vaccinated: true,
      neutered: true,
      microchipped: true,
      specialNeeds: false,
    },
    goodWith: {
      children: true,
      dogs: true,
      cats: false,
    },
    personality: ["Friendly", "Playful", "Energetic", "Affectionate"],
    adoptionFee: 250,
    image: "/placeholder.svg?height=500&width=500",
    featured: true,
  }

  // Use sample data if API fails
  const displayDog = dog || (loading ? null : sampleDog)

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-8">{error}</p>
        <button
          onClick={() => router.push("/pages/dogs")}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Back to Dogs
        </button>
      </div>
    )
  }

  if (!displayDog) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dog Not Found</h2>
        <p className="text-gray-600 mb-8">The dog you're looking for doesn't exist or has been adopted.</p>
        <button
          onClick={() => router.push("/pages/dogs")}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Browse Available Dogs
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => router.push("/pages/dogs")}
            className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to all dogs
          </button>
        </div>

        {/* Dog details */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Image section */}
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-full">
                <Image
                  src={displayDog.image || "/placeholder.svg"}
                  alt={displayDog.name}
                  className="w-full h-full object-cover"
                  width={600}
                  height={600}
                />
                {displayDog.featured && (
                  <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
              </div>
            </div>

            {/* Details section */}
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-900">{displayDog.name}</h1>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <Heart className="h-6 w-6 text-red-500" />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center text-gray-700">
                  <PawPrint className="h-5 w-5 mr-1 text-primary-600" />
                  <span>{displayDog.breed}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 mr-1 text-primary-600" />
                  <span>
                    {displayDog.age} {displayDog.age === 1 ? "year" : "years"} old
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 mr-1 text-primary-600" />
                  <span>
                    {displayDog.location.city}, {displayDog.location.state}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900">About {displayDog.name}</h2>
                <p className="mt-2 text-gray-700 leading-relaxed">{displayDog.description}</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">Size</h3>
                  <p className="text-gray-700">{displayDog.size}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Gender</h3>
                  <p className="text-gray-700">{displayDog.gender}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-gray-900">Personality</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {displayDog.personality.map((trait, index) => (
                    <span key={index} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-gray-900">Health</h3>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    {displayDog.healthStatus.vaccinated ? (
                      <Check className="h-5 w-5 text-green-500 mr-1" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mr-1" />
                    )}
                    <span className="text-gray-700">Vaccinated</span>
                  </div>
                  <div className="flex items-center">
                    {displayDog.healthStatus.neutered ? (
                      <Check className="h-5 w-5 text-green-500 mr-1" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mr-1" />
                    )}
                    <span className="text-gray-700">Neutered/Spayed</span>
                  </div>
                  <div className="flex items-center">
                    {displayDog.healthStatus.microchipped ? (
                      <Check className="h-5 w-5 text-green-500 mr-1" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mr-1" />
                    )}
                    <span className="text-gray-700">Microchipped</span>
                  </div>
                  <div className="flex items-center">
                    {displayDog.healthStatus.specialNeeds ? (
                      <Check className="h-5 w-5 text-yellow-500 mr-1" />
                    ) : (
                      <X className="h-5 w-5 text-green-500 mr-1" />
                    )}
                    <span className="text-gray-700">Special Needs</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-gray-900">Good with</h3>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div className="flex items-center">
                    {displayDog.goodWith.children ? (
                      <Check className="h-5 w-5 text-green-500 mr-1" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mr-1" />
                    )}
                    <span className="text-gray-700">Children</span>
                  </div>
                  <div className="flex items-center">
                    {displayDog.goodWith.dogs ? (
                      <Check className="h-5 w-5 text-green-500 mr-1" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mr-1" />
                    )}
                    <span className="text-gray-700">Dogs</span>
                  </div>
                  <div className="flex items-center">
                    {displayDog.goodWith.cats ? (
                      <Check className="h-5 w-5 text-green-500 mr-1" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mr-1" />
                    )}
                    <span className="text-gray-700">Cats</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center">
                  Apply to Adopt - ${displayDog.adoptionFee}
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar dogs section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* This would be populated with similar dogs based on breed, age, etc. */}
            {/* For now, just showing placeholder content */}
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <Image
                    src={`/placeholder.svg?height=300&width=300`}
                    alt="Similar dog"
                    className="w-full h-48 object-cover"
                    width={300}
                    height={150}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">Similar Dog {item}</h3>
                  <p className="text-gray-600 text-sm">View this dog</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DogDetailsPage

