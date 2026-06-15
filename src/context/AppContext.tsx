import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

interface AppCtx {
  isAuthed: boolean;
  signIn: () => void;
  signOut: () => void;
  myList: string[];
  toggleMyList: (id: string) => void;
  inMyList: (id: string) => boolean;
  openModal: (id: string) => void;
  closeModal: () => void;
  modalId: string | null;
}

const Ctx = createContext<AppCtx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [myList, setMyList] = useState<string[]>([]);
  const [modalId, setModalId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsAuthed(localStorage.getItem("nf_auth") === "1");
    try { setMyList(JSON.parse(localStorage.getItem("nf_list") || "[]")); } catch {}
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("nf_list", JSON.stringify(myList));
  }, [myList]);

  const signIn = useCallback(() => {
    setIsAuthed(true);
    if (typeof window !== "undefined") localStorage.setItem("nf_auth", "1");
  }, []);
  const signOut = useCallback(() => {
    setIsAuthed(false);
    if (typeof window !== "undefined") localStorage.removeItem("nf_auth");
  }, []);
  const toggleMyList = useCallback((id: string) => {
    setMyList(l => l.includes(id) ? l.filter(x => x !== id) : [...l, id]);
  }, []);
  const inMyList = useCallback((id: string) => myList.includes(id), [myList]);

  const value = useMemo<AppCtx>(() => ({
    isAuthed, signIn, signOut, myList, toggleMyList, inMyList,
    modalId, openModal: setModalId, closeModal: () => setModalId(null),
  }), [isAuthed, signIn, signOut, myList, toggleMyList, inMyList, modalId]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used within AppProvider");
  return v;
}
