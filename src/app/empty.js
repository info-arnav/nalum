"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RotateLoader } from "react-spinners";

export default function Empty({ link }) {
  const router = useRouter();
  useEffect(() => {
    router.push(link);
  });
  return (
    <div className="empty">
      <RotateLoader color="black" />
    </div>
  );
}
