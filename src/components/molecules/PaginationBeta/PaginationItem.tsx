import Link from "next/link";
type PaginationItemProps = {
  isActive?: boolean;
  number: number;
  searchParams?: { [key: string]: string | string[] | undefined };
};
export function PaginationItem({
  isActive,
  number,
  searchParams,
}: PaginationItemProps) {
  return (
    <Link
      href={{
        query: {
          ...searchParams,
          page: number,
        },
      }}
      passHref
    >
      <button
        className={`w-8 h-8 rounded-full font-medium text-sm ${
          isActive
            ? "bg-primary text-white"
            : "text-color-gray-50 hover:bg-neutral-100"
        } flex items-center justify-center`}
      >
        {number}
      </button>
    </Link>
  );
}
