export interface SWAPIResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Film {
  title: string;
}

export interface Planet {
  name: string;
  terrain: string;
  diameter: string;
  climate: string;
  films: Film[];
  url: string;
}

export interface Specie {
  name: string;
}

export interface Vehicles {
  name: string;
  model: string;
}

export interface Resident {
  name: string;
  hair_color: string;
  eye_color: string;
  gender: string;
  species: Specie[];
  vehicles: Vehicles[];
}

export interface PlanetDetail {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  population: string;
  residents: Resident[];
}

export interface RawPlanetDetail extends Omit<PlanetDetail, "residents"> {
  // SWAPI returns resident URLs here; we'll resolve them to Resident[]
  residents: string[];
}

export interface RawResident {
  name: string;
  hair_color: string;
  eye_color: string;
  gender: string;
  species: string[]; // URLs
  vehicles: string[]; // URLs
}
