import { getPlanets } from "@/lib/server-utils";
import { SWAPIResponse, Planet } from "@/lib/types";
import { PlanetList } from "@/components/planet-list";

import styles from "./page.module.scss";

interface PageProps {
  searchParams?: Promise<{ page?: string }>;
}

const ITEMS_PER_PAGE = 10;

export default async function Home({ searchParams }: PageProps) {
  const { page: pageParam } = (await searchParams) ?? {};
  const page = Number(pageParam ?? "1") || 1;

  // Let Next.js app/error.tsx boundary handle any error.
  const data: SWAPIResponse<Planet> = await getPlanets(page);

  const totalPages = Math.ceil(data.count / ITEMS_PER_PAGE);

  return (
    <section className={styles.page}>
      {" "}
      <h1>
        Planets (Page {page} of {totalPages})
      </h1>
      <PlanetList data={data} />
    </section>
  );
}
