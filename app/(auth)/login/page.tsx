import { Avatar } from "@/components/avatar";
import { LoginForm } from "./form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="grid max-w-3xl grid-cols-2 overflow-hidden rounded-xl">
      <div className="bg-background p-8">
        <h3 className="mb-1 text-center text-xl font-medium">Авторизация</h3>
        <p className="mb-2 text-center text-sm text-muted-foreground">
          Используйте корпоративный логин от учетной записи АлтГУ.
        </p>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
      <div className="hidden flex-col items-center justify-center bg-background/35 p-8 text-center backdrop-blur md:flex">
        <q>
          Наш образовательный портал позволяет нам двигаться в ногу со временем,
          преодолевая все препятствия на пути
        </q>
        <Avatar fallback="ИИ" className="mb-2 mt-6" />
        <p className="text-sm font-medium">Иванов Иван Иванович</p>
        <span className="text-sm text-muted-foreground">Студент</span>
      </div>
    </main>
  );
}
