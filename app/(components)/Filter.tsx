"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const sizes: { [key: string]: string } = {
  all: "All cabins",
  small: "1-3 guests",
  medium: "4-7 guests",
  large: "8-12 guests",
};

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="border border-primary-800 flex">
      {Object.keys(sizes).map((size) => (
        <Button
          key={size}
          filter={size}
          activeFilter={activeFilter}
          handleFilter={handleFilter}
        >
          {sizes[size]}
        </Button>
      ))}
    </div>
  );
}

type ButtonProps = {
  filter: string;
  activeFilter: string;
  handleFilter: (filter: string) => void;
  children: any;
};

function Button({ filter, handleFilter, activeFilter, children }: ButtonProps) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeFilter === filter ? "bg-primary-900 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
