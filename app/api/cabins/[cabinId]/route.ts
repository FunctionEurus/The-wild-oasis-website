import { getBookedDatesByCabinId, getCabin } from "@/app/(lib)/data-service";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { [key: string]: string } }
) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json("Cabin not found");
  }
}
