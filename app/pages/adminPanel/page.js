"use client"
import axios from "axios"
import { useState } from "react"

const Admin = () => {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [courseName, setCourseName] = useState("")
  const [duration, setDuration] = useState("")
  const [fees, setFees] = useState("")
  //const [rating, setRating] = useState("");
  const [establishedYear, setEstablishedYear] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "name") {
      setName(value)
    } else if (name === "city") {
      setCity(value)
    } else if (name === "state") {
      setState(value)
    } else if (name === "country") {
      setCountry(value)
    } else if (name === "courseName") {
      setCourseName(value)
    } else if (name === "duration") {
      setDuration(value)
    } else if (name === "fees") {
      setFees(value)
    } else if (name === "establishedYear") {
      setEstablishedYear(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!name || !city || !state || !country || !courseName || !duration || !fees || !establishedYear) {
      toast.error("All fields are required")
      setLoading(false)
      return
    }
    try {
      const response = await axios.post("/api/admin/collegeupload", {
        name,
        city,
        state,
        country,
        courseName,
        duration,
        fees,
        establishedYear,
      })
      console.log("college uploaded successfully:", response.data)
      setName("")
      setCity("")
      setState("")
      setCountry("")
      setCourseName("")
      setDuration("")
      setFees("")
      setEstablishedYear("")
      toast.success("college uploaded successfully!")
    } catch (error) {
      console.error("college upload failed:", error.response ? error.response.data : error.message)
      toast.error(error.response?.data?.error || "college upload failed. Please try again.")
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Upload College Details</h1>
          <form onSubmit={handleSubmit}>
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
              <label className="block text-gray-700 font-bold mb-2" htmlFor="country">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={country}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="courseName">
                Course Name
              </label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                value={courseName}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="duration">
                Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={duration}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="fees">
                Fees
              </label>
              <input
                type="text"
                id="fees"
                name="fees"
                value={fees}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="establishedYear">
                Established Year
              </label>
              <input
                type="text"
                id="establishedYear"
                name="establishedYear"
                value={establishedYear}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Admin

