import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, Download, Globe, Tv } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NetflixLogo } from "@/components/NetflixLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Netflix — Unlimited movies, TV shows, and more" },
      { name: "description", content: "Watch anywhere. Cancel anytime." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Tv, title: "Enjoy on your TV", body: "Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more." },
  { icon: Download, title: "Download your shows", body: "Save your favorites easily and always have something to watch." },
  { icon: Globe, title: "Watch everywhere", body: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV." },
];

const faqs = [
  { q: "What is Netflix?", a: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices." },
  { q: "How much does Netflix cost?", a: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $6.99 to $22.99 a month." },
  { q: "Where can I watch?", a: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web from personalcomputer or on any internet-connected device." },
  { q: "How do I cancel?", a: "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks." },
  { q: "What can I watch on Netflix?", a: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more." },
  { q: "Is Netflix good for kids?", a: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space." },
];

function Landing() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <div className="relative min-h-[95vh] border-b-8 border-[#222]">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/netflix-hero/1920/1080"
            className="w-full h-full object-cover"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
        </div>
        <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
          <NetflixLogo className="h-7 md:h-10" />
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-1 text-sm border border-white/30 px-2 py-1 rounded bg-black/40">
              <Globe className="w-4 h-4" /> English <ChevronDown className="w-3 h-3" />
            </button>
            <Link to="/signin" className="bg-[#e50914] hover:bg-[#f40612] px-4 py-1.5 rounded text-sm font-semibold">
              Sign In
            </Link>
          </div>
        </header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl mx-auto text-center px-4 pt-24 md:pt-40"
        >
          <h1 className="text-4xl md:text-6xl font-black leading-tight drop-shadow-2xl">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="mt-4 text-lg md:text-2xl">Starts at $6.99. Cancel anytime.</p>
          <p className="mt-6 text-base md:text-lg">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          <form
            className="mt-4 flex flex-col sm:flex-row gap-2 max-w-xl mx-auto"
            onSubmit={(e) => { e.preventDefault(); window.location.href = "/signin"; }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 bg-black/60 border border-white/40 px-4 py-3 rounded text-base outline-none focus:border-white"
            />
            <button className="bg-[#e50914] hover:bg-[#f40612] px-6 py-3 rounded text-lg font-semibold flex items-center justify-center gap-1">
              Get Started <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        </motion.div>
      </div>

      {/* Features */}
      {features.map((f, i) => (
        <section
          key={i}
          className={`px-6 md:px-12 py-12 md:py-16 border-b-8 border-[#222] ${i % 2 ? "bg-black" : "bg-black"}`}
        >
          <div className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div>
              <h2 className="text-3xl md:text-5xl font-black">{f.title}</h2>
              <p className="mt-4 text-lg md:text-2xl text-white/90">{f.body}</p>
            </div>
            <div className="grid place-items-center">
              <div className="w-full max-w-md aspect-video rounded-xl bg-gradient-to-br from-red-900/40 to-black border border-white/10 grid place-items-center">
                <f.icon className="w-20 h-20 text-[#e50914]" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section className="px-6 md:px-12 py-16 border-b-8 border-[#222]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-2">
            {faqs.map((f, i) => (
              <div key={i} className="bg-[#2d2d2d]">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left text-lg md:text-2xl font-medium hover:bg-[#414141] transition-colors"
                >
                  <span>{f.q}</span>
                  <ChevronDown className={`w-8 h-8 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-black"
                    >
                      <p className="px-6 py-5 text-lg md:text-xl">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-base md:text-lg">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          <form
            className="mt-4 flex flex-col sm:flex-row gap-2"
            onSubmit={(e) => { e.preventDefault(); window.location.href = "/signin"; }}
          >
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-black/60 border border-white/40 px-4 py-3 rounded text-base outline-none focus:border-white"
            />
            <button className="bg-[#e50914] hover:bg-[#f40612] px-6 py-3 rounded text-lg font-semibold flex items-center justify-center gap-1">
              Get Started <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12 text-[#737373] text-sm">
        <div className="max-w-5xl mx-auto">
          <p className="mb-6">Questions? Call 1-844-505-2993</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["FAQ","Help Center","Account","Media Center","Investor Relations","Jobs","Ways to Watch","Terms of Use","Privacy","Cookie Preferences","Corporate Information","Contact Us","Speed Test","Legal Notices","Only on Netflix"].map(l => (
              <a key={l} href="#" className="hover:underline">{l}</a>
            ))}
          </div>
          <button className="mt-6 inline-flex items-center gap-2 border border-[#333] px-3 py-1.5 text-white/80">
            <Globe className="w-4 h-4" /> English
          </button>
          <p className="mt-6">Netflix Clone — demo project. Not affiliated with Netflix, Inc.</p>
        </div>
      </footer>
    </div>
  );
}
