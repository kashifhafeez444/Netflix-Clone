import { Info, Play } from "lucide-react";
import { motion } from "framer-motion";
import type { Movie } from "@/data/mockMovies";
import { useApp } from "@/context/AppContext";

export function HeroBanner({ movie }: { movie: Movie }) {
  const { openModal } = useApp();
  return (
    <section className="relative w-full h-[85vh] min-h-[520px] -mt-16">
      <div className="absolute inset-0">
        <img src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 hero-fade-bottom" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative h-full flex flex-col justify-end pb-32 px-4 md:px-12 max-w-3xl"
      >
        {movie.isOriginal && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#e50914] font-black tracking-[0.3em] text-xs">N</span>
            <span className="text-xs tracking-[0.3em] text-white/80">SERIES</span>
          </div>
        )}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black drop-shadow-2xl leading-none">
          {movie.title}
        </h1>
        <p className="mt-5 text-base md:text-lg text-white/90 max-w-xl line-clamp-3 drop-shadow-lg">
          {movie.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => openModal(movie.id)}
            className="inline-flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2.5 rounded font-semibold hover:bg-white/80 transition-colors"
          >
            <Play className="w-5 h-5 fill-black" /> Play
          </button>
          <button
            onClick={() => openModal(movie.id)}
            className="inline-flex items-center gap-2 bg-white/25 backdrop-blur text-white px-6 md:px-8 py-2.5 rounded font-semibold hover:bg-white/40 transition-colors"
          >
            <Info className="w-5 h-5" /> More Info
          </button>
        </div>
      </motion.div>
      <div className="absolute right-0 bottom-32 hidden md:flex items-center">
        <div className="flex items-center gap-3 bg-black/40 border-l-4 border-white/80 pl-3 pr-12 py-1.5">
          <span className="text-xs tracking-wider">{movie.rating}</span>
        </div>
      </div>
    </section>
  );
}
