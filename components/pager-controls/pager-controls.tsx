"use client";

import Pagination from "@mui/material/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import styles from "./pager-controls.module.scss";

export function PagerControls({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    nextPage: number
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(nextPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={handleChange}
      className={styles["pager-controls"]}
    />
  );
}
