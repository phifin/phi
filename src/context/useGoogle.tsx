"use client";

import { useState } from "react";
import { googleSignIn } from "@/app/third-party/config/firebaseConfig";
import { signInWithGoogle } from "@/app/third-party/services/auth";
export default function GoogleLogin() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await googleSignIn();
      const idToken = await result.user.getIdToken(); // id token from firebase
      console.log("Google ID Token:", idToken);

      // req(id token) => res(at)
      const backendResponse = await signInWithGoogle(idToken);
      console.log("Backend Response:", backendResponse);

      if (!backendResponse.data || !backendResponse.data.accessToken) {
        throw new Error("AccessToken is missing from backend response");
      }

      setAccessToken(backendResponse.data.accessToken);
      alert("Login successful!");
    } catch (err: any) {
      console.error("Error during Google login:", err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Login with Google</h2>
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        {loading ? "Logging in..." : "Login with Google"}
      </button>
      {accessToken && <p className="mt-4">Access Token: {accessToken}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
