import { auth } from "@/app/(lib)/auth";
import { Session } from "next-auth";

export const metadata = {
  title: "Guest area",
};

async function Page() {
  const session = (await auth()) as Session;
  const firstName = session?.user?.name?.split(" ").at(0);

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {firstName}
    </h2>
  );
}

export default Page;
