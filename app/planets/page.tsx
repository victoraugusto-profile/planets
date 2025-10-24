import { Suspense } from "react";

import { PlanetList } from "@/components/planet-list";

import styles from "./page.module.scss";

interface PageProps {
  searchParams?: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const { page: pageParam } = (await searchParams) ?? {};
  const page = Number(pageParam ?? "1") || 1;

  return (
    <section className={styles.page}>
      {" "}
      <h1>Planets</h1>
      <Suspense fallback={<p className={styles.loading}>Loading planets...</p>}>
        <PlanetList page={page} />
      </Suspense>
    </section>
  );
}
