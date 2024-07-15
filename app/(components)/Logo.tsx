import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        alt="The Wild Oasis logo"
        height="50"
        width="50"
        src={logo}
        quality={100}
      />
      <span className="hidden font-semibold text-primary-100 sm:block sm:text-lg lg:block lg:text-xl">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
