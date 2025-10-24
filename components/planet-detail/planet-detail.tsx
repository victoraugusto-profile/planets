import { PlanetDetail as PlanetDetailType } from "@/lib/types";
import styles from "./planet-detail.module.scss";

type PlanetDetailProps = {
  planet: PlanetDetailType;
};

export function PlanetDetail({ planet }: PlanetDetailProps) {
  return (
    <div className={styles.card}>
      <ul className={styles["planet-info"]}>
        <li>
          <strong>Rotation period:</strong> {planet.rotation_period}
        </li>
        <li>
          <strong>Orbital period:</strong> {planet.orbital_period}
        </li>
        <li>
          <strong>Diameter:</strong> {planet.diameter}
        </li>
        <li>
          <strong>Climate:</strong> {planet.climate}
        </li>
        <li>
          <strong>Gravity:</strong> {planet.gravity}
        </li>
        <li>
          <strong>Terrain:</strong> {planet.terrain}
        </li>
        <li>
          <strong>Population:</strong> {planet.population}
        </li>
      </ul>
      <section className={styles.residents}>
        <h2>Residents</h2>
        {planet.residents.length ? (
          <ul className={styles["resident-list"]}>
            {planet.residents.map((r, idx) => (
              <li key={`${r.name}-${idx}`} className={styles["resident-card"]}>
                <h3>{r.name}</h3>
                <p>
                  <strong>Hair color:</strong> {r.hair_color}
                </p>
                <p>
                  <strong>Eye color:</strong> {r.eye_color}
                </p>
                <p>
                  <strong>Gender:</strong> {r.gender}
                </p>
                <div>
                  <strong>Species:</strong>{" "}
                  {r.species.length ? (
                    <ul className={styles["species-list"]}>
                      {r.species.map((s, idx) => (
                        <li key={`${s.name}-${idx}`}>{s.name}</li>
                      ))}
                    </ul>
                  ) : (
                    "none"
                  )}
                </div>
                <div>
                  <strong>Vehicles:</strong>{" "}
                  {r.vehicles.length ? (
                    <ul className={styles["vehicles-list"]}>
                      {r.vehicles.map((v, idx) => (
                        <li key={`${v.name}-${v.model}-${idx}`}>
                          {v.name} <em>({v.model})</em>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "none"
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>No known residents.</p>
        )}
      </section>
    </div>
  );
}
