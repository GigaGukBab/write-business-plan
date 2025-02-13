"use client";

import { useRouter } from "next/navigation";

export default function FiveMinDocsLogo() {
  const router = useRouter();
  return (
    <div
      role="button"
      onClick={() => router.push("/")}
      className="text-2xl font-bold text-primary"
    >
      5minDocs
    </div>
  );
}
