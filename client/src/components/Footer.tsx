const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <h4 className="text-xl font-semibold mb-2">About Us</h4>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">Contact Us</h4>
            <p>Email: info@example.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">Locations</h4>
            <p>Auckland</p>
            <p>Dunedin</p>
            <p>Wellington</p>
          </div>
        </div>
        <div className="text-sm">
          © {new Date().getFullYear()} Tailored Tails. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
