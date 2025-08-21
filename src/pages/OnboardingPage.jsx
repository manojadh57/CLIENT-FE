// /src/pages/OnboardingPage.jsx

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store";
import api from "../api/axios";
import { logout } from "../store/authSlice";
import ForumRules from "../components/ForumRules";

function isEnglishCityName(s) {
  if (!s) return false;
  const trimmed = s.trim();
  return /^[A-Za-z][A-Za-z\s\-']{1,39}$/.test(trimmed);
}

export default function OnboardingPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const [city, setCity] = useState("");
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState("");

  const popularCities = useMemo(
    () => [
      "Sydney",
      "Melbourne",
      "Brisbane",
      "Adelaide",
      "Perth",
      "Canberra",
      "Hobart",
      "Darwin",
    ],
    []
  );

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleReroll = async () => {
    const ok = window.confirm(
      "This will delete your current account and sign you out, so you can re-login with a new random username. Continue?"
    );
    if (!ok) return;
    try {
      await api.delete("/users/me?purge=1");
    } catch {
      // fail-safe: logout regardless
    } finally {
      dispatch(logout());
      navigate("/login");
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setErr("");

    if (!isEnglishCityName(city)) {
      return setErr(
        "Enter a valid English city (2–40 letters, spaces, hyphens)."
      );
    }

    if (!agree) {
      return setErr("You must agree to the community rules.");
    }

    const profile = { city: city.trim(), agreedAt: new Date().toISOString() };
    localStorage.setItem("profile_v1", JSON.stringify(profile));
    localStorage.setItem("onboarding_done", "true");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-2">Welcome, {user.username}</h1>
      <p className="text-gray-600 mb-4">
        Let’s finish setting up your account.
      </p>

      {/* Username section */}
      <section className="border border-gray-200 rounded p-4 mb-6 bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-1">Username</h2>
        <p className="text-sm text-gray-600">
          Your randomly assigned username is permanent after onboarding.
        </p>
        <div className="font-mono text-base bg-gray-100 rounded px-3 py-1 inline-block mt-2">
          {user.username}
        </div>
        <div className="mt-3">
          <button
            onClick={handleReroll}
            className="text-sm text-blue-600 hover:underline"
          >
            🔀 Reroll username
          </button>
        </div>
      </section>

      {/* Form */}
      <form onSubmit={handleContinue}>
        {/* City */}
        <div className="mb-4">
          <label htmlFor="city" className="font-semibold">
            Which city are you in?
          </label>
          <input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g., Sydney"
            className={`block w-full mt-2 border rounded px-3 py-2 ${
              city && !isEnglishCityName(city)
                ? "border-red-500"
                : "border-gray-300"
            }`}
            maxLength={40}
            required
          />
          <small className="text-gray-500">
            Letters, spaces, hyphens; 2–40 chars.
          </small>
          {/* City buttons */}
          <div className="flex flex-wrap gap-2 mt-2">
            {popularCities.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCity(c)}
                className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Rules */}
        <div className="mb-4">
          <ForumRules />
          <label className="block mt-3">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mr-2"
            />
            I have read and agree to the forum rules.
          </label>
        </div>

        {/* Error */}
        {err && <p className="text-red-600 mb-3">{err}</p>}

        {/* Continue */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Continue to Home
        </button>
      </form>
    </div>
  );
}
