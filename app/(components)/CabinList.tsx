import CabinCard from "@/app/(components)/CabinCard";
import { Cabin } from "@/app/(types)/type";
import { getCabins } from "../(lib)/data-service";
import { unstable_noStore } from "next/cache";

type CabinListProp = {
  filter: string;
};

async function CabinList({ filter }: CabinListProp) {
  unstable_noStore();
  const cabins: any = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins: Cabin[] = [];
  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter((cabin: Cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin: Cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === "large")
    displayedCabins = cabins.filter((cabin: Cabin) => cabin.maxCapacity >= 8);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
