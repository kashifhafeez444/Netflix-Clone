import { movies } from "./mockMovies";

export type NotificationType = "new" | "coming_soon" | "recommended";

export interface Notification {
  id: string;
  movieId: string;
  type: NotificationType;
  message: string;
  timeAgo: string;
  read: boolean;
}

const templates: { type: NotificationType; message: (title: string) => string; timeAgo: string }[] = [
  { type: "new", message: (t) => `${t} is now on Netflix`, timeAgo: "2 hours ago" },
  { type: "coming_soon", message: (t) => `${t} — Coming Friday`, timeAgo: "1 day ago" },
  { type: "recommended", message: (t) => `Because you watched similar titles: ${t}`, timeAgo: "3 days ago" },
  { type: "new", message: (t) => `New episode available: ${t}`, timeAgo: "5 hours ago" },
  { type: "coming_soon", message: (t) => `${t} arrives next week`, timeAgo: "2 days ago" },
  { type: "recommended", message: (t) => `Top pick for you: ${t}`, timeAgo: "4 days ago" },
];

export const notifications: Notification[] = templates.map((tpl, i) => {
  const movie = movies[i * 3];
  return {
    id: `n-${i}`,
    movieId: movie.id,
    type: tpl.type,
    message: tpl.message(movie.title),
    timeAgo: tpl.timeAgo,
    read: i >= 2,
  };
});

export function getUnreadCount(items: Notification[]) {
  return items.filter((n) => !n.read).length;
}
