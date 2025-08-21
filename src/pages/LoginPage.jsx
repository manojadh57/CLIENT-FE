import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { useAppSelector } from "../store";

export default function LoginPage() {
  const { user } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const done = localStorage.getItem("onboarding_done") === "true";
      if (!done) navigate("/onboarding");
    }
  }, [user, navigate]);

  return (
    <div style={{ padding: 16 }}>
      <h1>Login</h1>
      {user ? (
        <p>
          Welcome back, <strong>{user.username}</strong>.{" "}
          <a href="/">Go to Home</a>
        </p>
      ) : (
        <GoogleSignInButton />
      )}
    </div>
  );
}
