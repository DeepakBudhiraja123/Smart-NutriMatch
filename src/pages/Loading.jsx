import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const messages = [
  "Analyzing nutritional requirements",
  "Checking dietary compatibility",
  "Filtering allergens",
  "Scoring meal recommendations",
  "Preparing your personalized results",
];

export default function Loading() {
  const navigate = useNavigate();
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) =>
        prev < messages.length - 1 ? prev + 1 : prev
      );
    }, 1800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 200);

    const timer = setTimeout(() => {
      navigate("/recommendations");
    }, 10000);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 flex items-center justify-center px-6">

      <div className="w-full max-w-xl bg-white rounded-[2rem] shadow-xl p-12 text-center border border-emerald-100">

        {/* Pulsing icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center animate-pulse">
            <span className="text-4xl">🥗</span>
          </div>
        </div>

        <p className="text-emerald-600 font-semibold tracking-wide mb-3">
          NUTRIMATCH ENGINE
        </p>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Creating Your Recommendations
        </h1>

        <p className="text-gray-600 mb-8 h-6 transition-all duration-500">
          {messages[messageIndex]}...
        </p>

        {/* Progress bar */}
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-4 text-sm text-gray-500">
          {progress}% completed
        </p>
      </div>
    </div>
  );
}