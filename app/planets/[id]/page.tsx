import Link from "next/link";
import { getPlanetDetail } from "@/lib/server-utils";
import styles from "./page.module.scss";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PlanetDetailPage({ params }: PageProps) {
  const { id } = await params;
  const planet = await getPlanetDetail(id);

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1>{planet.name}</h1>
        <Link href="/planets" className={styles["back-link"]}>
          ← Back to planets
        </Link>
      </header>
      <div className={styles.card}>
        <ul className={styles.meta}>
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
                <li
                  key={`${r.name}-${idx}`}
                  className={styles["resident-card"]}
                >
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
                    {r.species.length
                      ? r.species.map((s, idx) => (
                          <span key={`${s.name}-${idx}`}>
                            {s.name}
                            {idx < r.species.length - 1 ? ", " : ""}
                          </span>
                        ))
                      : "none"}
                  </div>
                  <div>
                    <strong>Vehicles:</strong>{" "}
                    {r.vehicles.length
                      ? r.vehicles.map((v, idx) => (
                          <span key={`${v.name}-${v.model}-${idx}`}>
                            {v.name} <em>({v.model})</em>
                            {idx < r.vehicles.length - 1 ? ", " : ""}
                          </span>
                        ))
                      : "none"}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>No known residents.</p>
          )}
        </section>
      </div>
    </section>
  );
}
