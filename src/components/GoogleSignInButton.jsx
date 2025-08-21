import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { googleLogin } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function GoogleSignInButton() {
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const { user, status, error } = useAppSelector((s) => s.auth);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  // Load Google script
  useEffect(() => {
    const id = "google-client-script";
    if (document.getElementById(id)) return setReady(true);
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.defer = true;
    s.id = id;
    s.onload = () => setReady(true);
    document.body.appendChild(s);
  }, []);

  // Render button
  useEffect(() => {
    if (!ready || !window.google || !ref.current) return;
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (resp) => {
        const idToken = resp.credential;
        dispatch(googleLogin(idToken));
      },
    });
    window.google.accounts.id.renderButton(ref.current, {
      theme: "outline",
      size: "large",
    });
  }, [ready, dispatch]);

  // Redirect after login
  useEffect(() => {
    if (user) {
      const done = localStorage.getItem("onboarding_done") === "true";
      navigate(done ? "/" : "/onboarding");
    }
  }, [user, navigate]);

  return (
    <div>
      {status === "loading" ? <p>Signing you in…</p> : <div ref={ref} />}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
