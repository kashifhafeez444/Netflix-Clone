import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroBanner } from "@/components/HeroBanner";
import { ContentRow } from "@/components/ContentRow";
import { Footer } from "@/components/Footer";
import { SkeletonRow } from "@/components/SkeletonLoader";
import { movies, rows } from "@/data/mockMovies";
import { useApp } from "@/context/AppContext";

export const Route = createFileRoute("/browse")({
  head: () => ({ meta: [{ title: "Home — Netflix" }] }),
  component: Browse,
});

function Browse() {
  const { isAuthed } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && !isAuthed && localStorage.getItem("nf_auth") !== "1") {
      navigate({ to: "/signin" });
    }
  }, [isAuthed, navigate]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const featured = movies[2];

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />
      <HeroBanner movie={featured} />
      <div className="relative z-10 -mt-24 pb-12">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
          : rows.map((r) => (
              <ContentRow
                key={r.title}
                title={r.title}
                items={r.ids.map((id) => movies.find((m) => m.id === id)!).filter(Boolean)}
              />
            ))}
      </div>
      <Footer />
    </div>
  );
}
