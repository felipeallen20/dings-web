import Image from "next/image";
import Link from "next/link";
import logoImg from "@/assets/images/logos/dings-logo.webp";

interface LogoProps {
  className?: string;
  priority?: boolean;
}

export function Logo({
  className = "max-h-7",
  priority = false,
}: LogoProps) {
  return (
    <Link href="/" className="shrink-0">
      <Image
        src={logoImg}
        alt="Dings"
        priority={priority}
        sizes="96px"
        className={`w-auto max-w-[160px] object-contain object-left ${className}`}
      />
    </Link>
  );
}