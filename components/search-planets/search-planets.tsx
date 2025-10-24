"use client";

import { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./search-planets.module.scss";

type SearchPlanetsProps = {
  initialQuery?: string;
};

export function SearchPlanets({ initialQuery }: SearchPlanetsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    if (value?.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["search-planets"]}>
      <TextField
        label="Search planets"
        variant="standard"
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value)}
        className={styles.input}
      />
      <Button type="submit" variant="contained" className={styles.button}>
        Search
      </Button>
    </form>
  );
}
