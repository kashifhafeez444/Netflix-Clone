import { Search, X } from "lucide-react";
import { useEffect, useRef } from "react";

export function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  return (
    <div className="flex items-center gap-3 border border-white/20 bg-black/70 px-4 py-3 rounded">
      <Search className="w-5 h-5 text-white/60" />
      <input
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Titles, people, genres"
        className="flex-1 bg-transparent outline-none text-base placeholder:text-white/40"
      />
      {value && (
        <button onClick={() => onChange("")} className="text-white/60 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
