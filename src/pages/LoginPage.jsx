// src/pages/LoginPage.jsx
import GoogleSignInButton from "../components/GoogleSignInButton";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50 relative overflow-hidden flex items-center justify-center">
      {/* Animated Circles BG */}
      <div className="absolute inset-0 z-0 animate-pulse opacity-10 pointer-events-none">
        <div className="absolute w-72 h-72 bg-blue-300 rounded-full top-20 left-10 blur-3xl animate-bounce"></div>
        <div className="absolute w-96 h-96 bg-yellow-300 rounded-full bottom-10 right-10 blur-2xl animate-ping"></div>
        <div className="absolute w-52 h-52 bg-pink-300 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-2xl animate-spin-slow"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-auto bg-white border-4 border-black rounded-lg p-8 shadow-[8px_8px_0px_black] text-center">
        {/* Title */}
        <h1 className="text-4xl font-black tracking-tight mb-1">NEPSTUDENT</h1>
        <h2
          className="text-xl font-[Mukta] text-gray-800 mb-6"
          style={{ fontFamily: "Mukta, sans-serif" }}
        >
          नेपस्टुडेन्ट
        </h2>

        {/* Tagline */}
        <p className="font-mono text-gray-700 text-lg mb-6">
          Study. Connect. Build.
        </p>

        {/* Google Login */}
        <div className="mb-4">
          <GoogleSignInButton />
        </div>

        {/* Subtext */}
        <p className="text-sm text-gray-500 font-mono">
          Login via <span className="font-bold">Google</span> to start sharing
          your ideas.
        </p>
      </div>
    </div>
  );
}
