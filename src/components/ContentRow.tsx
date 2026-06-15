import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import type { Movie } from "@/data/mockMovies";
import { MovieCard } from "./MovieCard";

export function ContentRow({ title, items }: { title: string; items: Movie[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const scroll = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section
      className="my-6 md:my-10 relative group/row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 className="px-4 md:px-12 text-base md:text-xl font-semibold mb-2 text-white">{title}</h2>
      <div className="relative">
        <button
          onClick={() => scroll(-1)}
          className={`absolute left-0 top-0 bottom-0 z-20 w-12 bg-black/60 hover:bg-black/80 transition-opacity hidden md:flex items-center justify-center ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <div
          ref={scrollerRef}
          className="flex gap-2 px-4 md:px-12 overflow-x-auto scrollbar-hide scroll-smooth pb-12 -mb-12"
        >
          {items.map(m => (
            <div key={m.id} className="shrink-0 w-[45vw] sm:w-[30vw] md:w-[22vw] lg:w-[18vw] xl:w-[16vw]">
              <MovieCard movie={m} />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll(1)}
          className={`absolute right-0 top-0 bottom-0 z-20 w-12 bg-black/60 hover:bg-black/80 transition-opacity hidden md:flex items-center justify-center ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
}
