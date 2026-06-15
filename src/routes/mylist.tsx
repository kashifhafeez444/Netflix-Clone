import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";
import { movies } from "@/data/mockMovies";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/mylist")({
  head: () => ({ meta: [{ title: "My List — Netflix" }] }),
  component: MyList,
});

function MyList() {
  const { myList } = useApp();
  const items = movies.filter((m) => myList.includes(m.id));

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />
      <div className="pt-28 px-4 md:px-12 pb-24">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">My List</h1>
        {items.length === 0 ? (
          <div className="text-white/60 py-24 text-center">
            Your list is empty. Add titles from Home to watch later.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {items.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
