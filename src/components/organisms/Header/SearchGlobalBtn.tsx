"use client";
import { useState } from "react";
import { SearchGlobal } from "../SearchGlobal";
import Icon from "@/components/atoms/Icons";
interface SearchGlobalBtnProps {
}
export function SearchGlobalBtn({  }: SearchGlobalBtnProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="hover:text-primary" onClick={() => setOpen(true)}>
        <Icon name="search" />
      </button>
      <SearchGlobal open={open} setOpen={setOpen} />
    </>
  );
}
