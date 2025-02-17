import Image from "next/image";

export default function Header() {
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
      <div className="mb-8 flex h-auto lg:static lg:w-auto lg:mb-0">
        <a
          href="/"
          className="flex items-center justify-center font-nunito text-lg font-bold gap-2"
        >
          {/* <span>Alola Intelligence</span> */}
          <Image
            className=""
            src="/alola-colorful.svg"
            alt="Alola Logo"
            width={80}
            height={80}
            priority
          />
        </a>
      </div>
    </div>
  );
}
