import Image from "next/image";

function SignInButton({ provider, action }: { provider: string; action: any }) {
  return (
    <form action={action}>
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
