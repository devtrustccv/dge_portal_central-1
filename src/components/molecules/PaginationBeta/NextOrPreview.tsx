import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type NextOrPreviewProps = {
  type: "NEXT" | "PREVIEW";
  currentPage: number;
  lastPage: number;
  searchParams?: { [key: string]: string | string[] | undefined };
};
export function NextOrPreview({
  type,
  currentPage,
  lastPage,
  searchParams,
}: NextOrPreviewProps) {

  const url: number = type == "PREVIEW"
      ? currentPage > 1 ? currentPage - 1 : 1
      : currentPage < lastPage ? currentPage + 1 : 1;

  return (
    <Link
      href={{
        query: {
          ...searchParams,
          page: url,
        },
      }}
    >
      <button
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs text-color-gray-50`}
        disabled={type == "NEXT" ? currentPage == lastPage : currentPage <= 1}
      >
        {type == "PREVIEW" ? (
          <ChevronLeft fontSize="16" />
        ) : (
          <ChevronRight fontSize="16" />
        )}
      </button>
    </Link>
  );
}
