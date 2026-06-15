import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { MovieCard } from "@/components/MovieCard";
import { movies, trendingSearches } from "@/data/mockMovies";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search — Netflix" }] }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return movies.filter(m =>
      m.title.toLowerCase().includes(t) ||
      m.genres.some(g => g.toLowerCase().includes(t)) ||
      m.cast.some(c => c.toLowerCase().includes(t))
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />
      <div className="pt-24 px-4 md:px-12 pb-24">
        <div className="max-w-3xl mx-auto">
          <SearchBar value={q} onChange={setQ} />
        </div>
        {q.trim() === "" ? (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-3 px-1">Trending Searches</h2>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4">
              {trendingSearches.map(m => (
                <div key={m.id} className="shrink-0 w-[240px]">
                  <MovieCard movie={m} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <p className="text-white/60 mb-4">{results.length} result{results.length !== 1 ? "s" : ""} for "{q}"</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {results.map(m => <MovieCard key={m.id} movie={m} />)}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
