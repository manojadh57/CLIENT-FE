import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  const handleLogout = () => {
    dispatch(logout()); // Clears Redux + localStorage
    localStorage.removeItem("auth_v1"); // Extra safety
    navigate("/login"); // Redirect to login
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        background: "#f9f9f9",
        borderBottom: "1px solid #eee",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Link to="/">🏠 Home</Link>
        <Link to="/bookmarks">🔖 Bookmarks</Link>
        <Link to="/messages">💬 Messages</Link>
        <Link to="/profile">👤 Profile</Link>
      </div>

      <div
        style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 8 }}
      >
        <Link
          to="/rules"
          style={{
            color: "red",
            fontWeight: "bold",
            border: "1px solid red",
            padding: "2px 8px",
            borderRadius: 4,
            textDecoration: "none",
          }}
        >
          ⚠️ Rules
        </Link>

        {user && (
          <>
            <span style={{ fontFamily: "monospace" }}>{user.username}</span>
            <button
              onClick={handleLogout}
              style={{
                fontSize: 14,
                padding: "4px 8px",
                borderRadius: 4,
                border: "1px solid #ccc",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              🚪 Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
