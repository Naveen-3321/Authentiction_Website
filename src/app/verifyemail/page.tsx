"use client";

import axios from "axios";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      toast.success("Verification success");
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
      toast.error("Verification failed");
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-5xl ">Verify Email</h1>
      <h2 className="bg-purple-600 p-1 rounded">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div>
          <Link className="text-center" href="/login">
            Login
          </Link>
        </div>
      )}
      {/* {error && (
        <div>
          <h2 className="bg-red-600">ERROR</h2>
        </div>
      )} */}
    </div>
  );
}
