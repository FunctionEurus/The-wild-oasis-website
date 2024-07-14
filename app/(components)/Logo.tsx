import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* <Image height="60" width="60" alt="The Wild Oasis logo" src="/logo.png" /> */}
      <Image
        alt="The Wild Oasis logo"
        height="60"
        width="60"
        src={logo}
        quality={100}
      />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
