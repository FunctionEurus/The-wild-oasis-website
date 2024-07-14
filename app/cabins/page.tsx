import { Suspense } from "react";
import CabinList from "@/app/(components)/CabinList";
import Spinner from "@/app/(components)/Spinner";
import Filter from "@/app/(components)/Filter";
import ReservationReminder from "../(components)/ReservationReminder";

export const revalidate = 3600;

export const metadata = {
  title: "Cabins",
};

type PageProps = {
  searchParams: null | {
    capacity?: string;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}