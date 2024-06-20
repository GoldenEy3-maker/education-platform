import { Icons } from "@/components/Icons";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-[radial-gradient(circle_at_bottom_left,rgb(250,232,2261)_10%,rgb(249,225,238)_30%,rgb(216,232,252)_50%,transparent_100%),radial-gradient(circle_at_bottom_right,rgb(115,234,236)_10%,rgb(170,202,244)_30%,rgba(216,232,252,1)_50%,transparent_100%)] bg-fixed dark:bg-[radial-gradient(circle_at_bottom_left,#6820b2_15%,#3760a1_40%,#4d68b6_60%,transparent_100%),radial-gradient(circle_at_bottom_right,#5a2492_20%,#3668b9_40%,#3258c5_60%,transparent_100%)]">
      <header className="mb-5 flex flex-col items-center justify-center gap-2 sm:mb-7">
        <span className="text-8xl">
          <Icons.Logo />
        </span>
        <h2 className="text-balance text-center text-xl font-medium sm:text-2xl">
          Образовательный портал АлтГУ
        </h2>
      </header>
      {children}
    </div>
  );
}
