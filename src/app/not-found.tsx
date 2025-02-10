import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        {/* SVG Illustration */}
        <svg
          className="mx-auto mb-6"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="90" fill="#2F2E41" />
          <path
            d="M80 60L120 140M120 60L80 140"
            stroke="#E7D040"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <circle cx="100" cy="100" r="30" fill="#FBBEBE" />
        </svg>

        {/* Message */}
        <p className="text-lg md:text-xl text-yellow-300 mb-6">
          Oops! You seem to be lost. 🥲
        </p>

        {/* Home Button */}
        <Link href="/">
          <button className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-white rounded-lg shadow-md hover:shadow-lg py-2 px-6 border border-yellow-300 hover:border-transparent transition-all duration-300">
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
}