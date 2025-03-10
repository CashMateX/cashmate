import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src="/banner-auth.png" alt="Logo" width={320} height={200} className="rounded-4xl" />
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">Login</legend>
        
        <label className="fieldset-label">Email</label>
        <input type="email" className="input" placeholder="Email" />
        
        <label className="fieldset-label">Password</label>
        <input type="password" className="input" placeholder="Password" />
        
        <button className="btn btn-neutral mt-4">Login</button>

        <div className="justify-center flex">
          <Link href="/register">Dont have an account? Register here</Link>
        </div>
      </fieldset>
    </div>
  );
}
