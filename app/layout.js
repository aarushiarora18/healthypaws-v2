import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar/page"
import Footer from "@/components/Footer/page"
import { Toaster } from "react-hot-toast"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Healthy Paws - Dog Adoption",
  description: "Find your perfect furry companion",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}



import './globals.css'