"use client"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-hot-toast"

const AdminPage = () => {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [breed, setBreed] = useState("")
  const [age, setAge] = useState("")
  const [size, setSize] = useState("Medium")
  const [gender, setGender] = useState("Male")
  const [description, setDescription] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("United States")
  const [adoptionFee, setAdoptionFee] = useState("")
  const [image, setImage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "name") {
      setName(value)
    } else if (name === "breed") {
      setBreed(value)
    } else if (name === "age") {
      setAge(value)
    } else if (name === "size") {
      setSize(value)
    } else if (name === "gender") {
      setGender(value)
    } else if (name === "description") {
      setDescription(value)
    } else if (name === "city") {
      setCity(value)
    } else if (name === "state") {
      setState(value)
    } else if (name === "country") {
      setCountry(value)
    } else if (name === "adoptionFee") {
      setAdoptionFee(value)
    } else if (name === "image") {
      setImage(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!name || !breed || !age || !size || !gender || !description || !city || !state || !adoptionFee) {
      toast.error("All fields are required")
      setLoading(false)
      return
    }

    try {
      const response = await axios.post("/api/dogs", {
        name,
        breed,
        age: Number(age),
        size,
        gender,
        description,
        location: {
          city,
          state,
          country,
        },
        adoptionFee: Number(adoptionFee),
        image: image || "/placeholder.svg?height=300&width=300",
        healthStatus: {
          vaccinated: true,
          neutered: true,
          microchipped: true,
          specialNeeds: false,
        },
        personality: ["Friendly", "Playful"],
        goodWith: {
          children: true,
          dogs: true,
          cats: false,
        },
        adoptionStatus: "Available",
      })

      console.log("Dog added successfully:", response.data)

      // Reset form
      setName("")
      setBreed("")
      setAge("")
      setSize("Medium")
      setGender("Male")
      setDescription("")
      setCity("")
      setState("")
      setCountry("United States")
      setAdoptionFee("")
      setImage("")

      toast.success("Dog added successfully!")
    } catch (error) {
      console.error("Dog upload failed:", error.response ? error.response.data : error.message)
      toast.error(error.response?.data?.error || "Dog upload failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Add New Dog</h1>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="breed">
                  Breed
                </label>
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  value={breed}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="age">
                  Age (years)
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={age}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="size">
                  Size
                </label>
                <select
                  id="size"
                  name="size"
                  value={size}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="Extra Large">Extra Large</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="gender">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="adoptionFee">
                  Adoption Fee ($)
                </label>
                <input
                  type="number"
                  id="adoptionFee"
                  name="adoptionFee"
                  value={adoptionFee}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="city">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="state">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={state}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
                  Image URL (optional)
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={image}
                  onChange={handleChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  rows="4"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? "Adding..." : "Add Dog"}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AdminPage

