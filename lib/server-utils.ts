import {
  SWAPIResponse,
  Planet,
  PlanetDetail,
  Resident,
  Specie,
  Vehicles,
  RawPlanetDetail,
  RawResident,
} from "@/lib/types";

async function fetchJson<T>(url: string, entity: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, { cache: "force-cache" });
  } catch (err) {
    throw new Error(`Failed to fetch ${entity} (${url}): ${err}.`);
  }
  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${entity} (${url}). Got status ${res.status}.`
    );
  }
  try {
    return (await res.json()) as T;
  } catch (err) {
    throw new Error(`Failed to parse JSON for ${entity} (${url}): ${err}.`);
  }
}

export async function getPlanets(page: number, searchStr?: string) {
  const searchQuery = searchStr ? `&search=${searchStr}` : "";
  const url = `https://swapi.dev/api/planets/?page=${page}${searchQuery}`;

  // Fetch planets
  const data = await fetchJson<
    SWAPIResponse<Omit<Planet, "films"> & { films: string[] }>
  >(url, "planets");

  // Resolve films for each planet in parallel
  const results: Planet[] = await Promise.all(
    data.results.map(async (p) => {
      const films = await Promise.all(
        (p.films ?? []).map((filmUrl) =>
          fetchJson<{ title: string }>(filmUrl, "film")
        )
      );
      // Films is now Film[] with { title }
      return { ...p, films };
    })
  );

  return { ...data, results } as SWAPIResponse<Planet>;
}

export async function getPlanetDetail(id: string) {
  // Fetch the planet
  const planetUrl = `https://swapi.dev/api/planets/${id}/`;
  const rawPlanet = await fetchJson<RawPlanetDetail>(planetUrl, `planet ${id}`);

  // Resolve residents in parallel
  const residents: Resident[] = await Promise.all(
    (rawPlanet.residents ?? []).map(async (residentUrl: string) => {
      const raw = await fetchJson<RawResident>(residentUrl, "resident");

      // Resolve species in parallel
      const speciesObjects: Specie[] = await Promise.all(
        (raw.species ?? []).map((specieUrl: string) =>
          fetchJson<Specie>(specieUrl, "specie")
        )
      );

      // Resolve vehicles in parallel
      const vehicleObjects: Vehicles[] = await Promise.all(
        (raw.vehicles ?? []).map((vehicleUrl: string) =>
          fetchJson<Vehicles>(vehicleUrl, "vehicle")
        )
      );

      const resident: Resident = {
        name: raw.name,
        hair_color: raw.hair_color,
        eye_color: raw.eye_color,
        gender: raw.gender,
        species: speciesObjects,
        vehicles: vehicleObjects,
      };

      return resident;
    })
  );

  const planet: PlanetDetail = {
    name: rawPlanet.name,
    rotation_period: rawPlanet.rotation_period,
    orbital_period: rawPlanet.orbital_period,
    diameter: rawPlanet.diameter,
    climate: rawPlanet.climate,
    gravity: rawPlanet.gravity,
    terrain: rawPlanet.terrain,
    population: rawPlanet.population,
    residents,
  };

  return planet;
}
