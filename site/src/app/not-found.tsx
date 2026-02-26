import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="text-[clamp(6rem,15vw,12rem)] font-bold leading-none tracking-tighter text-white/10">
        404
      </div>
      <p className="mt-4 text-sm text-white/40">
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm text-white/60 border-b border-white/20 pb-1 hover:text-white hover:border-white/50 transition-colors"
      >
        Back to index
      </Link>
    </div>
  );
}
