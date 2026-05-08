export default function Hero() {
  return (
    <section className="relative text-center py-24 px-6 overflow-hidden">
      <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-20 w-40 h-40 bg-green-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <p className="text-emerald-600 font-semibold mb-4 tracking-wide">
        AI Powered Nutrition Recommendations
      </p>

      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight max-w-5xl mx-auto">
        Personalized Meals For
        <span className="text-emerald-600"> Better Health</span>
      </h1>

      <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
        Discover meal recommendations crafted around your health profile.
      </p>
    </section>
  );
}