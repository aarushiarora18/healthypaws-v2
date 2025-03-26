const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary-800 to-secondary-800 py-10">
      <div className="container mx-auto px-6 text-center text-white">
        <p className="mb-4 text-lg font-semibold">
          Contact us at{" "}
          <a href="mailto:info@healthypaws.com" className="underline hover:text-yellow-300 transition duration-300">
            info@healthypaws.com
          </a>
        </p>

        <div className="flex justify-center space-x-8 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition duration-300"
          >
            <i className="fab fa-facebook-f fa-lg"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition duration-300"
          >
            <i className="fab fa-twitter fa-lg"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition duration-300"
          >
            <i className="fab fa-instagram fa-lg"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition duration-300"
          >
            <i className="fab fa-linkedin-in fa-lg"></i>
          </a>
        </div>

        <p className="text-sm text-gray-300 mb-2">
          &copy; {new Date().getFullYear()} Healthy Paws. All rights reserved.
        </p>

        <p className="text-sm text-gray-400">
          <a href="/privacy-policy" className="hover:text-yellow-300 transition duration-300">
            Privacy Policy
          </a>{" "}
          |
          <a href="/terms-of-service" className="hover:text-yellow-300 transition duration-300">
            {" "}
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer

