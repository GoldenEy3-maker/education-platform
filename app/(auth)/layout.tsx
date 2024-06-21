import { Avatar } from "@/components/avatar";
import { Icons } from "@/components/Icons";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-[radial-gradient(circle_at_bottom_left,rgb(250,232,2261)_10%,rgb(249,225,238)_30%,rgb(216,232,252)_50%,transparent_100%),radial-gradient(circle_at_bottom_right,rgb(115,234,236)_10%,rgb(170,202,244)_30%,rgba(216,232,252,1)_50%,transparent_100%)] bg-cover bg-fixed bg-center bg-no-repeat p-4 dark:bg-none">
      <div className="fixed inset-0 -z-10 hidden items-center justify-center bg-[linear-gradient(45deg,rgba(7,14,34,1)_20%,rgba(19,55,148,1)_100%)] blur-[100px] dark:flex">
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M429 300.897L927 322.897H1353.5L1210.5 739L665.619 801.897L225 702.397L429 300.897Z"
            fill="#9B239E"
          />
          <path
            d="M1495.5 9.5L1670.5 359.737H1202.5L876 69.5L1495.5 9.5Z"
            fill="url(#paint0_radial_1_33)"
          />
          <defs>
            <radialGradient
              id="paint0_radial_1_33"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(1323.5 185) rotate(106.044) scale(181.819 412.45)"
            >
              <stop stopColor="#0CA7FF" />
              <stop offset="1" stopColor="#5389BA" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <header className="mb-5 flex flex-col items-center justify-center gap-2 sm:mb-7">
        <span className="text-8xl">
          <Icons.Logo />
        </span>
        <h2 className="text-balance text-center text-xl font-medium sm:text-2xl">
          Образовательный портал АлтГУ
        </h2>
      </header>
      <main className="grid max-w-3xl grid-cols-1 overflow-hidden rounded-xl md:grid-cols-2">
        {children}
        <div className="hidden flex-col items-center justify-center bg-background/35 p-8 text-center backdrop-blur md:flex">
          <q>
            Наш образовательный портал позволяет нам двигаться в ногу со
            временем, преодолевая все препятствия на пути
          </q>
          <Avatar fallback="ИИ" className="mb-2 mt-6" />
          <p className="text-sm font-medium">Иванов Иван Иванович</p>
          <span className="text-sm text-muted-foreground">Студент</span>
        </div>
      </main>
    </div>
  );
}
