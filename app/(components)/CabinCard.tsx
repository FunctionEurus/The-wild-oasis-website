import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Cabin } from "@/app/(types)/type";
import Link from "next/link";

type CabinCardProp = {
  cabin: Cabin;
};

function CabinCard({ cabin }: CabinCardProp) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex border-primary-800 border">
      <div className="flex-1 relative">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover border-r border-primary-800 min-w-10"
        />
      </div>

      <div className="lg:flex-grow">
        <div className="pt-4 px-4 pb-2 lg:pt-5 sm:pb-4 sm:px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-2xl sm:mb-3">
            Cabin {name}
          </h3>

          <div className="flex gap-2 sm:gap-3 items-center sm:mb-2">
            <UsersIcon className="h-3 w-3 sm:h-5 sm:w-5 text-primary-600" />
            <p className="sm:text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex gap-2 sm:gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-xl sm:text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-xl sm:text-3xl font-[350]">
                ${regularPrice}
              </span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <Link
            href={`/cabins/${id}`}
            className="border-l border-primary-800 py-2 px-3 sm:py-4 sm:px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
