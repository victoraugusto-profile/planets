"use client";

import { redirect } from "next/navigation";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="error-page">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => redirect("/planets")}>Go back to Planets</button>
    </div>
  );
}
