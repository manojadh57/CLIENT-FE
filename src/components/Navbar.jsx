import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { logout } from "../store/authSlice";
import { getQuota } from "../utils/quota";
import { stripeAPI } from "../api/stripe"; // make sure this file exists

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const quota = getQuota();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleUnlock = async () => {
    try {
      const { url } = await stripeAPI.createDMUnlockSession();
      window.location.href = url;
    } catch (err) {
      console.error("Stripe session failed:", err);
      alert("Failed to create checkout session.");
    }
  };

  return (
    <nav className="w-full border-b border-black flex flex-wrap justify-between items-center px-4 py-3 bg-white shadow-sm">
      {/* Left: Brand */}
      <div className="flex items-center font-black text-xl tracking-tight">
        <Link to="/" className="hover:opacity-80 transition-all">
          NepStudent
        </Link>
      </div>

      {/* Center: Quota with Unlock */}
      <div className="text-[13px] sm:text-sm font-mono bg-yellow-100 border border-yellow-400 px-3 py-1 rounded flex items-center gap-2 mt-2 sm:mt-0">
        Daily: {quota.posts}/1 post, {quota.comments}/3 comments, {quota.dms}/1
        DM
        <button
          onClick={handleUnlock}
          className="bg-black text-white px-2 py-0.5 rounded text-xs hover:bg-gray-800 transition"
        >
          Unlock
        </button>
      </div>

      {/* Right: Nav links & user */}
      <div className="flex items-center gap-4 text-sm sm:text-base font-bold uppercase mt-2 sm:mt-0">
        {[
          { label: "Feed", path: "/" },
          { label: "Messages", path: "/messages" },
          { label: "Bookmarks", path: "/bookmarks" },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="relative px-2 py-1 group"
          >
            <span className="group-hover:underline decoration-2 underline-offset-2">
              {item.label}
            </span>
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </Link>
        ))}

        {user && (
          <>
            <Link
              to="/rules"
              className="text-red-600 font-semibold text-xs border border-red-600 px-2 py-1 rounded hover:bg-red-100 transition"
            >
              Rules
            </Link>

            <Link
              to="/profile"
              className="font-mono hover:underline decoration-2 underline-offset-4"
            >
              {user.username}
            </Link>

            <button
              onClick={handleLogout}
              className="bg-black text-white text-xs px-3 py-1 rounded hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
