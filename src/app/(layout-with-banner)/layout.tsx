import { ThemeSetter } from "@/components/atoms/theme-setter";
import React from "react";

export default function BannerTopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ThemeSetter theme="light" />
      {children}
    </div>
  );
}

