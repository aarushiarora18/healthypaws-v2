"use client"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Mail, Lock, ArrowRight } from "lucide-react"

const Signup = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "username") {
      setUsername(value)
    } else if (name === "email") {
      setEmail(value)
    } else if (name === "password") {
      setPassword(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!username || !email || !password) {
      toast.error("All fields are required")
      setLoading(false)
      return
    }
    try {
      const response = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      })
      router.push("/pages/dogs")
      console.log(response.data)
      console.log("signup successful")

      toast.success("Signup successful!")

      setUsername("")
      setEmail("")
      setPassword("")
    } catch (error) {
      toast.error(error.response?.data?.error || "Signup failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl p-8 space-y-8">
          <div className="text-center">
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">Join us today and find your perfect furry friend</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="relative">
                <label className="text-sm font-medium text-gray-700 block mb-2" htmlFor="username">
                  Username
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-sm font-medium text-gray-700 block mb-2" htmlFor="email">
                  Email
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-sm font-medium text-gray-700 block mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">Processing...</span>
              ) : (
                <span className="flex items-center">
                  Sign up
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/pages/login" className="font-medium text-primary-600 hover:text-primary-500 transition">
                Log in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup

