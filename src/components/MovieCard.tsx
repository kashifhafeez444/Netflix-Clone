import { ChevronDown, Play, Plus, ThumbsUp, Check } from "lucide-react";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Movie } from "@/data/mockMovies";
import { useApp } from "@/context/AppContext";

export function MovieCard({ movie, big = false }: { movie: Movie; big?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { openModal, toggleMyList, inMyList } = useApp();
  const saved = inMyList(movie.id);

  const onEnter = () => {
    timer.current = setTimeout(() => setHovered(true), 500);
  };
  const onLeave = () => {
    if (timer.current) clearTimeout(timer.current);
    setHovered(false);
  };

  return (
    <div
      className="relative shrink-0 group"
      style={{ width: big ? 280 : undefined }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="aspect-video w-full overflow-hidden rounded cursor-pointer" onClick={() => openModal(movie.id)}>
        <img
          src={movie.backdrop}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:opacity-80"
        />
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 0 }}
            animate={{ opacity: 1, scale: 1.35, y: -40 }}
            exit={{ opacity: 0, scale: 0.95, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-0 left-0 right-0 z-30 origin-center bg-[#181818] rounded shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden pointer-events-auto"
            onClick={() => openModal(movie.id)}
          >
            <div className="aspect-video w-full overflow-hidden">
              <img src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); openModal(movie.id); }}
                  className="w-8 h-8 rounded-full bg-white text-black grid place-items-center hover:bg-white/80"
                  aria-label="Play"
                >
                  <Play className="w-4 h-4 fill-black" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMyList(movie.id); }}
                  className="w-8 h-8 rounded-full border-2 border-white/60 grid place-items-center hover:border-white"
                  aria-label="My List"
                >
                  {saved ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 rounded-full border-2 border-white/60 grid place-items-center hover:border-white"
                  aria-label="Rate"
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); openModal(movie.id); }}
                  className="ml-auto w-8 h-8 rounded-full border-2 border-white/60 grid place-items-center hover:border-white"
                  aria-label="More"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2 text-sm font-semibold truncate">{movie.title}</div>
              <div className="mt-1 flex items-center gap-2 text-xs">
                <span className="text-emerald-400 font-semibold">{movie.matchPercent}% Match</span>
                <span className="border border-white/40 px-1 text-[10px]">{movie.rating}</span>
                <span className="text-white/70">{movie.duration}</span>
                <span className="border border-white/30 px-1 text-[10px]">HD</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-2 text-xs text-white/80">
                {movie.genres.map((g, i) => (
                  <span key={g} className="flex items-center gap-2">
                    {i > 0 && <span className="text-white/40">•</span>}{g}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
