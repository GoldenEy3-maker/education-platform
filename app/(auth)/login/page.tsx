import { LoginForm } from "./form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="bg-background p-8">
      <h3 className="mb-1 text-center text-xl font-medium">Авторизация</h3>
      <p className="mb-2 text-center text-sm text-muted-foreground">
        Используйте корпоративный логин от учетной записи АлтГУ.
      </p>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
