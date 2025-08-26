"use client";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const ForgotPassword = async () => {
    try {
      await axios.post("/api/users/forgotpassword", { email });
      toast.success("Email sent");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-center">Reset Password</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Enter email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="border rounded px-2  py-1"
        />
        <button
          className=" bg-blue-500 px-4 py-2 rounded"
          onClick={ForgotPassword}
        >
          Submit email
        </button>
      </div>
    </div>
  );
}
