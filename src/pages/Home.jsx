import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import PreferenceForm from "../components/home/PreferenceForm";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100">
      <Navbar />
      <Hero />
      <PreferenceForm />
      <Footer />
    </div>
  );
}