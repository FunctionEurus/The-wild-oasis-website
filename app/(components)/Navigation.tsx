import Link from "next/link";
import { auth } from "../(lib)/auth";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-m sm:text-lg lg:text-xl">
      <ul className="flex gap-6 items-center sm:gap-12 lg:gap-16">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-2 sm:gap-3 lg:gap-4"
            >
              <img
                src={session.user.image}
                className="h-8 rounded-full flex items-center gap-2 sm:gap-3 lg:gap-4"
                alt={session.user.name as string}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
