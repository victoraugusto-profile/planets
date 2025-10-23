import styles from "./page.module.scss";

interface Planet {
  name: string;
  terrain: string;
  diameter: string;
  climate: string;
  films: string[];
  url: string;
}

interface SWAPIResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface PageProps {
  searchParams?: Promise<{ page?: string }>;
}

const ITEMS_PER_PAGE = 10;

export default async function Home({ searchParams }: PageProps) {
  const { page: pageParam } = (await searchParams) ?? {};
  const page = Number(pageParam ?? "1") || 1;

  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`, {
    // Since the values for each call will be the same, we don't need to
    // refresh the cache.
    cache: "force-cache",
  });

  if (!res.ok) {
    // Let Next.js app/error.tsx boundary handle it.
    throw new Error(`Failed to fetch planets (status ${res.status})`);
  }

  const data = (await res.json()) as SWAPIResponse<Planet>;

  const totalPages = Math.ceil(data.count / ITEMS_PER_PAGE);

  const getPlanets = () => {
    if (!data || !data.results || data.results.length === 0) {
      return null;
    }

    return (
      <ul className={styles.planets}>
        {data.results.map((planet) => {
          return (
            <li key={planet.url}>
              <h2>{planet.name}</h2>
              <p>{planet.terrain}</p>
              <p>{planet.diameter}</p>
              <p>{planet.climate}</p>
              {!!planet.films && planet.films.length !== 0 ? (
                <ul>
                  {planet.films.map((film) => (
                    <li key={film}>{film}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <section className={styles.page}>
      {" "}
      <h1>
        Planets (Page {page} of {totalPages})
      </h1>
      {getPlanets()}
    </section>
  );
}
