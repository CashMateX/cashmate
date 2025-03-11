import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src="/banner-auth.png" alt="Logo" width={320} height={200} className="rounded-4xl" />
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">Register</legend>
        
        <label className="fieldset-label">Email</label>
        <input type="email" className="input" placeholder="Email" />

        <label className="fieldset-label">Username</label>
        <input type="text" className="input" placeholder="Email" />
        
        <label className="fieldset-label">Password</label>
        <input type="password" className="input" placeholder="Password" />

        <label className="fieldset-label">Repeat Password</label>
        <input type="password" className="input" placeholder="Repeat Password" />
        
        <button className="btn btn-neutral mt-4">Register</button>

        <div className="justify-center flex">
          <Link href="/">Already have an account? Login here</Link>
        </div>
      </fieldset>
    </div>
  );
}
