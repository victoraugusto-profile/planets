import { SWAPIResponse, Planet } from "@/lib/types";

export async function getPlanets(page: number, searchStr?: string) {
  let res: Response;
  let data: SWAPIResponse<Planet>;

  const searchQuery = searchStr ? `&search=${searchStr}` : "";

  try {
    res = await fetch(
      `https://swapi.dev/api/planets/?page=${page}${searchQuery}`,
      {
        // Since the values for each call will be the same, we don't need to
        // refresh the cache.
        cache: "force-cache",
      }
    );
  } catch (err) {
    throw new Error(`Failed to fetch planets: ${err}.`);
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch planets. Got status ${res.status}.`);
  }

  try {
    data = (await res.json()) as SWAPIResponse<Planet>;
  } catch (err) {
    throw new Error(`Failed to parse JSON: ${err}.`);
  }

  return data;
}
