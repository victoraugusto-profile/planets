import { getPlanets } from "@/lib/server-utils";
import { SWAPIResponse, Planet } from "@/lib/types";
import { PagerControls } from "../pager-controls/pager-controls";

import styles from "./planet-list.module.scss";

interface PlanetListProps {
  page: number;
}

const ITEMS_PER_PAGE = 10;

export async function PlanetList({ page }: PlanetListProps) {
  // Let Next.js app/error.tsx boundary handle any error.
  const data: SWAPIResponse<Planet> = await getPlanets(page);

  const totalPages = Math.ceil(data.count / ITEMS_PER_PAGE);

  if (!data?.results?.length) {
    return <p className={styles.empty}>No planets found.</p>;
  }

  return (
    <>
      <ul className={styles["planet-list"]}>
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
      <PagerControls page={page} totalPages={totalPages} />
    </>
  );
}
