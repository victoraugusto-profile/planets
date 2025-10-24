import { Suspense } from "react";

import { PlanetList } from "@/components/planet-list/planet-list";
import { SearchPlanets } from "@/components/search-planets/search-planets";

import styles from "./page.module.scss";

interface PageProps {
  searchParams?: Promise<{ page?: string; search?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const { page: pageParam, search } = (await searchParams) ?? {};
  const page = Number(pageParam ?? "1") || 1;

  return (
    <section className={styles.page}>
      {" "}
      <h1>Planets</h1>
      <SearchPlanets initialQuery={search} />
      <Suspense fallback={<p className={styles.loading}>Loading planets...</p>}>
        <PlanetList page={page} search={search} />
      </Suspense>
    </section>
  );
}
