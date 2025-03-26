import Link from "next/link"
import { ChevronRight, Search, Heart, Users, ArrowRight, PawPrint, CheckCircle } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-700">
          <div className="absolute inset-0 bg-black/30"></div>
          {/* Background image would go here */}
        </div>
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white [text-shadow:_0_1px_12px_rgb(0_0_0_/_20%)]">
            Find Your Perfect
            <span className="block mt-2 bg-gradient-to-r from-green-200 to-blue-200 text-transparent bg-clip-text">
              Furry Companion
            </span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-green-50 max-w-3xl mx-auto leading-relaxed">
            Adopt a loving dog, give them a forever home, and experience the joy of unconditional love.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search dogs by breed, size, or age..."
                className="w-full px-6 py-4 rounded-full text-gray-900 bg-white/95 backdrop-blur-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
              />
              <button className="absolute right-2 top-2 px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all duration-300 transform hover:scale-105">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="relative -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Dogs Adopted", value: "500+" },
            { label: "Happy Families", value: "450+" },
            { label: "Partner Shelters", value: "25+" },
            { label: "Success Rate", value: "98%" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
                {stat.value}
              </div>
              <div className="text-gray-600 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white pointer-events-none"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h3 className="text-4xl font-bold mb-16 text-gray-800">
            Why Choose
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
              {" "}
              Healthy Paws?
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Verified Shelters",
                desc: "We partner with verified shelters to ensure all dogs are healthy and well-cared for.",
                icon: <CheckCircle className="w-8 h-8 text-primary-600" />,
              },
              {
                title: "Perfect Match",
                desc: "Our matching system helps you find the perfect dog that fits your lifestyle and preferences.",
                icon: <Heart className="w-8 h-8 text-primary-600" />,
              },
              {
                title: "Post-Adoption Support",
                desc: "We provide ongoing support and resources after you adopt your new best friend.",
                icon: <Users className="w-8 h-8 text-primary-600" />,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-primary-50 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h3 className="text-4xl font-bold text-center mb-16">
            How It
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
              {" "}
              Works
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
            {/* Connecting line in background */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary-200 via-secondary-200 to-primary-200"></div>

            {[
              {
                title: "Browse Dogs",
                desc: "Find dogs that match your lifestyle and preferences.",
                icon: <Search className="w-8 h-8" />,
              },
              {
                title: "Apply to Adopt",
                desc: "Complete a simple application to ensure a good match.",
                icon: <PawPrint className="w-8 h-8" />,
              },
              {
                title: "Meet & Adopt",
                desc: "Meet your potential new friend and complete the adoption.",
                icon: <ArrowRight className="w-8 h-8" />,
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="bg-gradient-to-r from-primary-600 to-secondary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                    {step.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">{step.title}</h4>
                  <p className="mt-4 text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-16 text-gray-800">
            What Our
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
              {" "}
              Adopters Say
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Adopting Max from Healthy Paws was the best decision we ever made. The process was smooth and supportive!",
                name: "Sarah Lee",
                role: "Adopted Max, Golden Retriever",
              },
              {
                text: "The matching system helped us find the perfect dog for our family. Bella fits right in with our active lifestyle!",
                name: "Jason Kumar",
                role: "Adopted Bella, Border Collie",
              },
              {
                text: "As a first-time dog owner, I appreciated all the resources and support. Daisy is now my best friend!",
                name: "Priya Sen",
                role: "Adopted Daisy, Beagle Mix",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="mb-6">
                  <Heart className="w-8 h-8 text-red-500 mx-auto" />
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">&quot;{testimonial.text}&quot;</p>
                <h4 className="text-primary-600 font-semibold">{testimonial.name}</h4>
                <span className="text-gray-400 text-sm">{testimonial.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h3 className="text-4xl font-bold mb-6 text-white">Ready to Find Your Furry Friend?</h3>
          <p className="text-xl text-green-100 mb-12 max-w-2xl mx-auto">
            Start browsing available dogs and begin your journey to pet parenthood today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/pages/signup"
              className="group bg-white text-primary-600 font-semibold px-8 py-4 rounded-full hover:bg-primary-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center"
            >
              Sign Up for Free
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/pages/dogs"
              className="group bg-primary-700/30 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full hover:bg-primary-700/40 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Browse Dogs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

