
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-indigo-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Manage Your Library with Ease 📚
          </h1>
          <p className="text-gray-600 mb-6">
            Easily add, edit, borrow, and track books in your collection. Ideal for schools, universities, or personal libraries.
          </p>
          <button
            onClick={() => navigate("/books")}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Browse Books
          </button>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src="https://i.ibb.co/WvTnd0TH/hero.jpg"
            alt="Library"
            className="w-full max-w-md mx-auto md:mx-0"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
