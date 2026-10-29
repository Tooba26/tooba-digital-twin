import { Suspense } from "react";
import Twin from "@/components/Twin";

export default function Page() {
  return (
    <Suspense>
      <Twin />
    </Suspense>
  );
}
