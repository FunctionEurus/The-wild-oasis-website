"use server";

import { auth, signIn, signOut } from "@/app/(lib)/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Booking, BookingData } from "../(types)/type";
import { getBooking, getBookings } from "./data-service";
import { supabase } from "./supabase";

export async function signInAction() {
  await signIn("github", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must login in!");

  const nationalID = formData.get("nationalID") as string;
  if (!nationalID) throw new Error("Please provide a national ID!");

  const [nationality, countryFlag] = (
    formData.get("nationality") as string
  ).split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID!");

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user?.guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error("You must login in!");

  const guestBookings = await getBookings(session.user?.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking!");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must login in!");

  const bookingId = Number(formData.get("bookingId"));
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations")?.slice(0, 1000);

  const updateData = {
    numGuests,
    observations,
  };

  const booking: Booking = await getBooking(bookingId);
  if (booking.guestId !== session.user?.guestId)
    throw new Error("You are not allowed to update this booking!");

  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) throw new Error("Booking could not be updated");

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath(`/account/reservations`);

  redirect("/account/reservations");
}

export async function createReservation(
  bookingData: BookingData,
  formData: FormData
) {
  const session = await auth();
  if (!session) throw new Error("You must login in!");

  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations")?.slice(0, 1000);

  const newBooking = {
    ...bookingData,
    guestId: session.user?.guestId,
    numGuests,
    observations,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath("/account/reservations");
  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}
