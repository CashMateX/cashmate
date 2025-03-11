"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

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
        
        <button className="btn btn-neutral mt-4">Login</button>

        <div className="justify-center flex">
          <Link href="/register">Dont have an account? Register here</Link>
        </div>
      </fieldset>
    </div>
  );
}
