import Image from "next/image";
import { signInAction } from "@/app/(lib)/action";

function SignInButton({ provider }: { provider: string }) {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <Image
          src={`https://authjs.dev/img/providers/${provider}.svg`}
          alt={`${provider} logo`}
          height="24"
          width="24"
        />
        <span>Continue with {provider}</span>
      </button>
    </form>
  );
}

export default SignInButton;
