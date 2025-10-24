import Link from "next/link";
import { getPlanets } from "@/lib/server-utils";
import { SWAPIResponse, Planet } from "@/lib/types";
import { PagerControls } from "../pager-controls/pager-controls";

import styles from "./planet-list.module.scss";

interface PlanetListProps {
  page: number;
  search?: string;
}

const ITEMS_PER_PAGE = 10;

function getIdFromUrl(url: string): string {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export async function PlanetList({ page, search }: PlanetListProps) {
  // Let Next.js app/error.tsx boundary handle any error.
  const data: SWAPIResponse<Planet> = await getPlanets(page, search);

  const totalPages = Math.ceil(data.count / ITEMS_PER_PAGE);

  if (!data?.results?.length) {
    return <p className={styles.empty}>No planets found.</p>;
  }

  const sortedPlanets = data.results.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return (
    <>
      <ul className={styles["planet-list"]}>
        {sortedPlanets.map((planet) => {
          const id = getIdFromUrl(planet.url);
          return (
            <li key={planet.url}>
              <Link href={`/planets/${id}`}>
                <h2>{planet.name}</h2>
                <p>{`Terrain: ${planet.terrain}`}</p>
                <p>{`Diameter: ${planet.diameter}`}</p>
                <p>{`Climate: ${planet.climate}`}</p>
                <div>
                  Films:
                  {!!planet.films && planet.films.length !== 0 ? (
                    <ul className={styles["films-list"]}>
                      {planet.films.map((film, idx) => (
                        <li key={`${film.title}-${idx}`}>{film.title}</li>
                      ))}
                    </ul>
                  ) : (
                    " none."
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <PagerControls page={page} totalPages={totalPages} />
    </>
  );
}
