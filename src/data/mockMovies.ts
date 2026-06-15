export interface Movie {
  id: string;
  title: string;
  description: string;
  year: number;
  rating: string; // age rating
  matchPercent: number;
  duration: string;
  genres: string[];
  cast: string[];
  tags: string[];
  isOriginal?: boolean;
  poster: string; // 2:3
  backdrop: string; // 16:9
}

const seeds = [
  "neon-city","desert-storm","ocean-deep","midnight-run","crimson-tide",
  "ghost-protocol","silent-witness","last-frontier","iron-throne","velvet-cage",
  "broken-arrow","red-horizon","stellar-drift","wolf-hour","echo-valley",
  "shadow-line","golden-hour","paper-tigers","quiet-storm","glass-houses",
  "north-star","wild-coast","dark-matter","blue-empire","kings-cross",
  "lonely-road","fast-lane","silver-fox","hollow-crown","summer-haze",
];

const titles = [
  "Crimson Skies","The Last Architect","Midnight Protocol","Wolves of Madrid","Echoes of Tomorrow",
  "Iron Republic","Velvet Shadows","Paper Empires","The Quiet Hour","Glass Kingdoms",
  "Northbound","Hollow Crown","Silver Fox","Stellar Drift","Broken Arrows",
  "Red Horizon","Blue Empire","The Lonely Road","Summer Haze","Ghost Protocol",
  "Silent Witness","The Last Frontier","Wild Coast","Dark Matter","King's Cross",
  "Golden Hour","Shadow Line","Paper Tigers","Fast Lane","The Wolf Hour",
];

const descriptions = [
  "A retired operative is pulled back into a deadly game when his past resurfaces in the most unexpected way.",
  "When a brilliant architect uncovers a conspiracy buried in the city's blueprints, every choice could be his last.",
  "In a world where memories can be traded, one detective must choose between the truth and the woman he loves.",
  "Three siblings inherit a vineyard — and a feud that has poisoned their family for generations.",
  "A teenage hacker discovers a signal from the future that only she can decode.",
  "Behind the marble walls of a billion-dollar dynasty, secrets are currency and loyalty is a weakness.",
  "A jazz singer returns to the city that broke her, only to find the man who left her now needs her help.",
  "In a near-future Tokyo, an ex-cop hunts the synthetic killers he helped create.",
  "Two rival chefs are forced to share one kitchen — and one impossible Michelin dream.",
  "A small-town sheriff investigates a missing-child case that connects to her own buried past.",
];

const genres = ["Action","Drama","Thriller","Sci-Fi","Crime","Romance","Mystery","Comedy","Adventure","Documentary"];
const castPool = ["Adria Arjona","Pedro Pascal","Zendaya","Oscar Isaac","Florence Pugh","Mahershala Ali","Lupita Nyong'o","Andrew Garfield","Sydney Sweeney","Idris Elba","Margot Robbie","Cillian Murphy"];
const tagPool = ["Suspenseful","Gritty","Cinematic","Emotional","Witty","Dark","Stylized","Binge-worthy","Critically Acclaimed","Award-winning"];
const ratings = ["TV-MA","TV-14","R","PG-13","TV-PG"];

function pick<T>(arr: T[], n: number, seed: number): T[] {
  const out: T[] = [];
  for (let i = 0; i < n; i++) out.push(arr[(seed * 7 + i * 13) % arr.length]);
  return Array.from(new Set(out));
}

export const movies: Movie[] = seeds.map((seed, i) => ({
  id: `m-${i}`,
  title: titles[i % titles.length],
  description: descriptions[i % descriptions.length],
  year: 2018 + (i % 7),
  rating: ratings[i % ratings.length],
  matchPercent: 80 + (i * 7) % 20,
  duration: i % 3 === 0 ? `${1 + (i % 3)} Season${i % 3 ? "s" : ""}` : `${1}h ${30 + (i * 3) % 30}m`,
  genres: pick(genres, 3, i),
  cast: pick(castPool, 4, i),
  tags: pick(tagPool, 3, i + 2),
  isOriginal: i % 4 === 0,
  poster: `https://picsum.photos/seed/${seed}-p/400/600`,
  backdrop: `https://picsum.photos/seed/${seed}-b/1600/900`,
}));

export const rows: { title: string; ids: string[] }[] = [
  { title: "Trending Now", ids: movies.slice(0, 12).map(m => m.id) },
  { title: "Netflix Originals", ids: movies.filter(m => m.isOriginal).map(m => m.id) },
  { title: "Top Picks for You", ids: movies.slice(6, 18).map(m => m.id) },
  { title: "Continue Watching", ids: movies.slice(3, 11).map(m => m.id) },
  { title: "Action & Adventure", ids: movies.filter(m => m.genres.includes("Action") || m.genres.includes("Adventure")).map(m => m.id) },
  { title: "Critically Acclaimed Dramas", ids: movies.filter(m => m.genres.includes("Drama")).map(m => m.id) },
  { title: "Mind-Bending Sci-Fi", ids: movies.filter(m => m.genres.includes("Sci-Fi")).map(m => m.id) },
  { title: "New Releases", ids: movies.slice(-12).map(m => m.id) },
];

export const trendingSearches = movies.slice(0, 10);

export function getMovie(id: string) {
  return movies.find(m => m.id === id);
}

export function recommend(id: string, n = 8): Movie[] {
  const m = getMovie(id);
  if (!m) return movies.slice(0, n);
  return movies.filter(x => x.id !== id && x.genres.some(g => m.genres.includes(g))).slice(0, n);
}
