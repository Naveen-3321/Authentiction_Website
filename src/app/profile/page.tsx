"use client";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout", { withCredentials: true });
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.error("Logout error:", error.message);
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me", { withCredentials: true });
      const userId = res.data.data._id;
      console.log("User ID:", userId);
      toast.success("Details gathered successfully");
      setData(userId);
    } catch (error: any) {
      console.error("Fetch user error:", error.message);
      toast.error("Failed to get user details");
      setData("Error fetching data");
    }
  };
  const onReset = () => {
    router.push("/resetpassword");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Toaster position="top-left" reverseOrder={true} />

      <h1 className="text-2xl font-bold">Profile</h1>
      <p className="mb-4">Welcome to your profile page.</p>

      {data === "nothing" ? (
        "No user data yet."
      ) : data === "Error fetching data" ? (
        <span className="text-red-500">{data}</span>
      ) : (
        <Link href={`/profile/${data}`} className="text-blue-600 underline">
          View Profile: {data}
        </Link>
      )}

      <div className="flex flex-col gap-3 mt-6">
        <button
          className="text-white bg-blue-500 p-3 rounded hover:cursor-pointer"
          onClick={onLogout}
        >
          Logout
        </button>
        <button
          className="text-white bg-purple-500 p-3 rounded hover:cursor-pointer"
          onClick={getUserDetails}
        >
          Get User Details
        </button>
        <button
          className="text-white bg-red-500 p-3 rounded hover:cursor-pointer"
          onClick={onReset}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
