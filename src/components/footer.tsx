// components/Footer.tsx

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:flex sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-semibold">📚 Book Library</h2>
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex justify-center space-x-6">
          <a href="/" className="text-gray-300 hover:text-white text-sm">
            Home
          </a>
          <a href="/books" className="text-gray-300 hover:text-white text-sm">
            Books
          </a>
          <a href="/borrow" className="text-gray-300 hover:text-white text-sm">
            Borrow
          </a>
          <a href="/contact" className="text-gray-300 hover:text-white text-sm">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
