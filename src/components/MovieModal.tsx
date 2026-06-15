import { AnimatePresence, motion } from "framer-motion";
import { Check, Play, Plus, ThumbsDown, ThumbsUp, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getMovie, recommend } from "@/data/mockMovies";
import { useApp } from "@/context/AppContext";


export function MovieModal() {
  const { modalId, closeModal, toggleMyList, inMyList, openModal } = useApp();
  const movie = modalId ? getMovie(modalId) : null;
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (modalId) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [modalId]);

  return (
    <AnimatePresence>
      {movie && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/80 overflow-y-auto"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl mx-auto my-8 bg-[#181818] rounded-md overflow-hidden shadow-2xl"
          >
            <div className="relative aspect-video">
              <img src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#181818] grid place-items-center hover:bg-black"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMuted(m => !m)}
                className="absolute bottom-20 right-6 w-10 h-10 rounded-full border-2 border-white/60 grid place-items-center hover:border-white"
                aria-label="Toggle sound"
              >
                {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-3xl md:text-5xl font-black drop-shadow-lg">{movie.title}</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="inline-flex items-center gap-2 bg-white text-black px-5 py-2 rounded font-semibold hover:bg-white/80">
                    <Play className="w-5 h-5 fill-black" /> Play
                  </button>
                  <button
                    onClick={() => toggleMyList(movie.id)}
                    className="w-10 h-10 rounded-full border-2 border-white/60 grid place-items-center hover:border-white"
                    aria-label="Add to my list"
                  >
                    {inMyList(movie.id) ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </button>
                  <button className="w-10 h-10 rounded-full border-2 border-white/60 grid place-items-center hover:border-white">
                    <ThumbsUp className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full border-2 border-white/60 grid place-items-center hover:border-white">
                    <ThumbsDown className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-10 grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-emerald-400 font-semibold">{movie.matchPercent}% Match</span>
                  <span>{movie.year}</span>
                  <span className="border border-white/40 px-1.5 text-xs">{movie.rating}</span>
                  <span>{movie.duration}</span>
                  <span className="border border-white/30 px-1.5 text-xs">HD</span>
                </div>
                <p className="text-white/90 leading-relaxed">{movie.description}</p>
              </div>
              <div className="space-y-2 text-sm">
                <div><span className="text-white/50">Cast: </span>{movie.cast.join(", ")}</div>
                <div><span className="text-white/50">Genres: </span>{movie.genres.join(", ")}</div>
                <div><span className="text-white/50">This show is: </span>{movie.tags.join(", ")}</div>
              </div>
            </div>
            <div className="px-6 md:px-10 pb-10">
              <h3 className="text-2xl font-semibold mb-4">More Like This</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {recommend(movie.id, 6).map(m => (
                  <div key={m.id} className="bg-[#2f2f2f] rounded overflow-hidden cursor-pointer hover:bg-[#3a3a3a] transition-colors"
                    onClick={() => openModal(m.id)}
                  >
                    <div className="aspect-video">
                      <img src={m.backdrop} alt={m.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between text-xs">
                        <span>{m.duration}</span>
                        <span className="text-emerald-400 font-semibold">{m.matchPercent}% Match</span>
                      </div>
                      <div className="mt-1 font-semibold text-sm">{m.title}</div>
                      <p className="mt-1 text-xs text-white/70 line-clamp-3">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
