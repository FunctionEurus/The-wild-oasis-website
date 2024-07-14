import Cabin from "@/app/(components)/Cabin";
import Reservation from "@/app/(components)/Reservation";
import Spinner from "@/app/(components)/Spinner";
import { getCabin, getCabins } from "@/app/(lib)/data-service";

import { Suspense } from "react";

type Params = {
  cabinId: string;
};

export async function generateStaticParams() {
  const cabins = await getCabins();

  return cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
}

export async function generateMetadata(params: { params: Params }) {
  const cabin = await getCabin(params.params.cabinId);
  if (!cabin) return;

  const { name } = cabin;
  return { title: `Cabin ${name}`, template: `%s / My Cabin Rentals` };
}

export default async function Page({ params }: { params: Params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
