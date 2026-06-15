import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  getUnreadCount,
  notifications as initialNotifications,
  type Notification,
} from "@/data/mockNotifications";
import { movies } from "@/data/mockMovies";
import { useApp } from "@/context/AppContext";

interface NotificationsDropdownProps {
  open: boolean;
  onToggle: () => void;
  onCloseOthers?: () => void;
}

export function NotificationsDropdown({ open, onToggle, onCloseOthers }: NotificationsDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Notification[]>(initialNotifications);
  const { openModal } = useApp();
  const unreadCount = getUnreadCount(items);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onToggle();
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open, onToggle]);

  const handleItemClick = (notification: Notification) => {
    setItems((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)),
    );
    openModal(notification.movieId);
    onToggle();
  };

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        onClick={() => {
          onCloseOthers?.();
          onToggle();
        }}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative hover:text-[#b3b3b3]"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#e50914]" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-[360px] bg-black/95 border border-white/15 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <h2 className="text-sm font-semibold text-white">Notifications</h2>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-[#b3b3b3] hover:text-white hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-[420px] overflow-y-auto scrollbar-hide">
            {items.length === 0 ? (
              <p className="px-4 py-8 text-sm text-[#b3b3b3] text-center">
                You have no notifications
              </p>
            ) : (
              <ul>
                {items.map((notification) => {
                  const movie = movies.find((m) => m.id === notification.movieId);
                  if (!movie) return null;

                  return (
                    <li key={notification.id}>
                      <button
                        onClick={() => handleItemClick(notification)}
                        className={`flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5 ${
                          !notification.read ? "bg-white/[0.03]" : ""
                        }`}
                      >
                        <div className="relative shrink-0 w-[120px] aspect-video overflow-hidden rounded-sm">
                          <img
                            src={movie.backdrop}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                          {!notification.read && (
                            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#e50914]" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0 py-0.5">
                          <p
                            className={`text-sm leading-snug ${
                              notification.read ? "text-[#b3b3b3]" : "text-white font-medium"
                            }`}
                          >
                            {notification.message}
                          </p>
                          <p className="mt-1 text-xs text-[#808080]">{notification.timeAgo}</p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
