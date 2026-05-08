import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full px-8 py-5 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-emerald-600 cursor-pointer">
  NutriMatch
</Link>

      <div className="hidden md:flex gap-8 text-gray-700 font-medium">
        <a href="/" className="hover:text-emerald-600 transition">
          Home
        </a>
        <a href="#" className="hover:text-emerald-600 transition">
          Features
        </a>
        <a href="#" className="hover:text-emerald-600 transition">
          About Us
        </a>
        <a href="#" className="hover:text-emerald-600 transition">
          Contact
        </a>
      </div>

      <button className="bg-emerald-600 text-white px-5 py-2 rounded-xl hover:bg-emerald-700 transition">
        Get Started
      </button>
    </nav>
  );
}