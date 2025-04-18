"use client";

import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const [success, setSuccess] = useState(false);

  const register = async () => {
    try {
      const response = await axios.post("/api/auth/register", {
        email: email,
        username: username,
        password: password,
        repeatPassword: repeatPassword
      });

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error: any) {
      setError(error.response.data.error);
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src="/banner-auth.png" alt="Logo" width={320} height={200} className="rounded-4xl" />
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">Register</legend>

        {showError &&
          <div role="alert" className="alert alert-error alert-soft">
            <span>Error! {error}</span>
          </div>
        }

        {success &&
          <div role="alert" className="alert alert-success alert-soft">
            <span>Success! Account created</span>
          </div>
        }

        <label className="fieldset-label">Email</label>
        <input type="email" className="input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

        <label className="fieldset-label">Username</label>
        <input type="text" className="input" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        
        <label className="fieldset-label">Password</label>
        <input type="password" className="input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <label className="fieldset-label">Repeat Password</label>
        <input type="password" className="input" placeholder="Repeat Password" onChange={(e) => setRepeatPassword(e.target.value)} />
        
        <button className="btn btn-neutral mt-4" onClick={register}>Register</button>

        <div className="justify-center flex">
          <Link href="/">Already have an account? Login here</Link>
        </div>
      </fieldset>
    </div>
  );
}
