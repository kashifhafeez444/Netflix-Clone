import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { NetflixLogo } from "./NetflixLogo";
import { NotificationsDropdown } from "./NotificationsDropdown";

const navLinks = [
  { label: "Home", to: "/browse" },
  { label: "TV Shows", to: "/browse" },
  { label: "Movies", to: "/browse" },
  { label: "New & Popular", to: "/browse" },
  { label: "My List", to: "/mylist" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useApp();
  const path = useRouterState({ select: s => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#141414]" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-4 md:px-12 h-16">
        <div className="flex items-center gap-8 min-w-0">
          <Link to="/browse" className="shrink-0">
            <NetflixLogo className="h-6 md:h-7" />
          </Link>
          <ul className="hidden lg:flex items-center gap-5 text-sm">
            {navLinks.map((l, i) => (
              <li key={i}>
                <Link
                  to={l.to}
                  className={`transition-colors hover:text-[#b3b3b3] ${
                    path === l.to ? "text-white font-semibold" : "text-white/90"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            className="lg:hidden flex items-center gap-1 text-sm text-white"
            onClick={() => setMenuOpen(o => !o)}
          >
            <Menu className="w-5 h-5" />
            <span className="hidden sm:inline">Browse</span>
          </button>
        </div>
        <div className="flex items-center gap-4 text-white shrink-0">
          <button onClick={() => navigate({ to: "/search" })} className="hover:text-[#b3b3b3]">
            <Search className="w-5 h-5" />
          </button>
          <NotificationsDropdown
            open={notificationsOpen}
            onToggle={() => setNotificationsOpen((o) => !o)}
            onCloseOthers={() => setAccountOpen(false)}
          />
          <div className="relative">
            <button
              onClick={() => {
                setAccountOpen((o) => !o);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded bg-gradient-to-br from-red-600 to-red-900 grid place-items-center text-xs font-bold">U</div>
              <ChevronDown className={`w-4 h-4 transition-transform ${accountOpen ? "rotate-180" : ""}`} />
            </button>
            {accountOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-black/95 border border-white/15 py-2 text-sm">
                <button className="block w-full text-left px-4 py-2 hover:underline">Account</button>
                <button className="block w-full text-left px-4 py-2 hover:underline">Help Center</button>
                <div className="border-t border-white/10 my-2" />
                <button
                  onClick={() => { signOut(); navigate({ to: "/" }); }}
                  className="block w-full text-left px-4 py-2 hover:underline"
                >
                  Sign out of Netflix
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div className="lg:hidden bg-black/95 border-t border-white/10">
          <ul className="flex flex-col py-2">
            {navLinks.map((l, i) => (
              <li key={i}>
                <Link
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-3 text-sm hover:bg-white/5"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
