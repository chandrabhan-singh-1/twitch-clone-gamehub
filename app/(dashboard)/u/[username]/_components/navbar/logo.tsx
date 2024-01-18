import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="flex items-center hover:opacity-75 transition">
        <div className="bg-white rounded-full p-1 mr-10 shrink-0 lg:mr-2">
          <Image
            src="/spooky.svg"
            alt="Gamehub"
            height={35}
            width={35}
            priority
          />
        </div>
        <div
          className={cn(
            "hidden lg:flex flex-col justify-center",
            font.className
          )}
        >
          <p className="text-xl font-semibold">Gamehub</p>
          <p className="text-xs text-muted-foreground">Creator Dashboard</p>
        </div>
      </div>
    </Link>
  );
};
