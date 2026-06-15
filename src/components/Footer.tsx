import { Globe } from "lucide-react";

const sections = [
  ["Audio Description", "Investor Relations", "Legal Notices"],
  ["Help Center", "Jobs", "Cookie Preferences"],
  ["Gift Cards", "Netflix Shop", "Corporate Information"],
  ["Media Center", "Terms of Use", "Contact Us"],
  ["Privacy", "Speed Test", ""],
];

export function Footer({ inside = false }: { inside?: boolean }) {
  return (
    <footer className={`${inside ? "" : "border-t border-white/10"} px-4 md:px-12 py-12 text-[#737373] text-sm`}>
      <div className="max-w-5xl mx-auto">
        <p className="mb-6">Questions? Call <a href="tel:1-844-505-2993" className="underline">1-844-505-2993</a></p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {sections.flat().filter(Boolean).map((s) => (
            <a key={s} href="#" className="hover:underline">{s}</a>
          ))}
        </div>
        <button className="inline-flex items-center gap-2 border border-[#333] px-3 py-1.5 text-white/80 hover:text-white">
          <Globe className="w-4 h-4" /> English
        </button>
        <p className="mt-6">Netflix Clone — demo project. Not affiliated with Netflix, Inc.</p>
      </div>
    </footer>
  );
}
