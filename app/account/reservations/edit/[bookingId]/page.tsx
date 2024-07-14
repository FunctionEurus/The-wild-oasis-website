import SubmitButton from "@/app/(components)/SubmitButton";
import { updateReservation } from "@/app/(lib)/action";
import { getBooking, getCabin } from "@/app/(lib)/data-service";
import { Booking, Cabin } from "@/app/(types)/type";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default async function Page({ params }: { params: Params }) {
  const reservationId = params.bookingId;
  const booking: Booking = await getBooking(reservationId);
  const cabin: Cabin = await getCabin(booking.cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
        action={updateReservation}
      >
        <input
          name="bookingId"
          id="bookingId"
          type="hidden"
          defaultValue={reservationId}
        />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
            defaultValue={booking.numGuests}
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: cabin.maxCapacity }, (_, i) => i + 1).map(
              (x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              )
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={booking.observations}
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Updateing...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
