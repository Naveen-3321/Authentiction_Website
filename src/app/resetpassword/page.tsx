"use client";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useReducer, useState } from "react";
import { url } from "inspector";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const urlPath = window.location.search.split("=")[1];
    setToken(urlPath);
  }, []);

  const ResetPassword = async () => {
    try {
      await axios.post("/api/users/resetpassword", { token, password });
      toast.success("Password changed");
      router.push("/login");
    } catch (error: any) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <h1>Reset Password</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Enter Password</label>
        <input
          id="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={ResetPassword}
          className="bg-blue-400 text-white px-4 py-2 rounded"
        >
          Change password
        </button>
      </div>
    </div>
  );
}
