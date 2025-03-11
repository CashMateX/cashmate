"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const router = useRouter();

  const login = async () => {
    try {
      const response = await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        Cookies.set("token", response.data.token);
        router.push("/dashboard");
      }
    } catch (error: any) {
      setError(error.response.data.error);
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src="/banner-auth.png" alt="Logo" width={320} height={200} className="rounded-4xl" />
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">Login</legend>

        {showError &&
          <div role="alert" className="alert alert-error alert-soft">
            <span>Error! {error}</span>
          </div>
        }
        
        <label className="fieldset-label">Email</label>
        <input type="email" className="input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        
        <label className="fieldset-label">Password</label>
        <input type="password" className="input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        
        <button className="btn btn-neutral mt-4" onClick={login}>Login</button>

        <div className="justify-center flex">
          <Link href="/register">Dont have an account? Register here</Link>
        </div>
      </fieldset>
    </div>
  );
}
