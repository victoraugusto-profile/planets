import { SWAPIResponse, Planet } from "@/lib/types";

import styles from "./planet-list.module.scss";

interface PlanetListProps {
  data: SWAPIResponse<Planet>;
}

export async function PlanetList({ data }: PlanetListProps) {
  if (!data || !data.results || data.results.length === 0) {
    return null;
  }

  return (
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
  );
}
