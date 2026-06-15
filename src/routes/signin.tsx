import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { NetflixLogo } from "@/components/NetflixLogo";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/signin")({
  head: () => ({ meta: [{ title: "Sign In — Netflix" }] }),
  component: SignIn,
});

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useApp();
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please enter a valid email and password."); return; }
    signIn();
    navigate({ to: "/browse" });
  };

  return (
    <div className="relative min-h-screen text-white">
      <div className="absolute inset-0">
        <img src="https://picsum.photos/seed/netflix-signin/1920/1080" className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <header className="relative z-10 px-6 md:px-12 py-4">
        <Link to="/"><NetflixLogo className="h-6 md:h-10" /></Link>
      </header>
      <main className="relative z-10 grid place-items-center px-4 pb-24">
        <div className="w-full max-w-md bg-black/75 rounded p-8 md:p-14">
          <h1 className="text-3xl font-bold mb-7">Sign In</h1>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="relative">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or phone number"
                className="peer w-full bg-[#333] rounded px-4 pt-5 pb-2 text-base outline-none border-b-2 border-transparent focus:border-[#e50914]"
              />
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="peer w-full bg-[#333] rounded px-4 pt-5 pb-2 text-base outline-none border-b-2 border-transparent focus:border-[#e50914]"
              />
            </div>
            {error && <p className="text-[#e87c03] text-sm">{error}</p>}
            <button type="submit" className="w-full bg-[#e50914] hover:bg-[#f40612] py-3 rounded font-semibold mt-6">
              Sign In
            </button>
            <div className="flex items-center justify-between text-sm text-[#b3b3b3]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-white" defaultChecked /> Remember me
              </label>
              <a href="#" className="hover:underline">Need help?</a>
            </div>
          </form>
          <div className="mt-12 text-[#737373]">
            <p>
              New to Netflix? <Link to="/" className="text-white hover:underline">Sign up now</Link>.
            </p>
            <p className="text-xs mt-3 leading-relaxed">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.
            </p>
          </div>
        </div>
      </main>
      <footer className="relative z-10 px-6 md:px-12 py-8 text-[#737373] text-sm bg-black/70">
        <div className="max-w-md mx-auto md:max-w-3xl">
          <p>Questions? Call 1-844-505-2993</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
            {["FAQ","Help Center","Terms of Use","Privacy","Cookie Preferences","Corporate Information"].map(l => (
              <a key={l} href="#" className="hover:underline">{l}</a>
            ))}
          </div>
          <select className="mt-6 bg-black border border-[#333] px-3 py-1.5 text-white/80">
            <option>English</option>
            <option>Español</option>
          </select>
        </div>
      </footer>
    </div>
  );
}
