import Link from "next/link";
import { getPlanetDetail } from "@/lib/server-utils";
import styles from "./page.module.scss";
import { PlanetDetail } from "@/components/planet-detail/planet-detail";

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
      <PlanetDetail planet={planet} />
    </section>
  );
}
