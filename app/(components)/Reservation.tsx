import { getBookedDatesByCabinId, getSettings } from "@/app/(lib)/data-service";
import { Cabin } from "@/app/(types)/type";
import DateSelector from "@/app/(components)/DateSelector";
import ReservationForm from "@/app/(components)/ReservationForm";
import { auth } from "@/app/(lib)/auth";
import LoginMessage from "@/app/(components)/LoginMessage";

type ReservationProp = {
  cabin: Cabin;
};

async function Reservation({ cabin }: ReservationProp) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
