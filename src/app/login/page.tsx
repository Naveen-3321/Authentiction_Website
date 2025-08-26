"use client";

import Link from "next/link";
import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { sendEmail } from "@/helpers/mailer";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  useEffect(() => {
    if (user.username.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error("Login failed.Try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex  flex-col justify-center items-center min-h-screen">
      <div>
        <Toaster position="top-left" reverseOrder={true} />
      </div>
      <h1 className="text-center text-white ">
        {loading ? "Processing" : "Login"}
      </h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        placeholder="Username"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="text"
        placeholder="Password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />{" "}
      <button
        className="text-white bg-blue-500 p-4 rounded-sm hover:cursor-pointer"
        onClick={onLogin}
      >
        Login
      </button>
      <Link href="/forgotpassword">Forgot password</Link>
      <Link href="/signup">Click here to sign up</Link>
    </div>
  );
}
