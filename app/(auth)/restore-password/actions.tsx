"use client";

import { Icons } from "@/components/Icons";
import { useStepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import { RoutesMap } from "@/lib/enums";
import Link from "next/link";

export function StepperActions() {
  const { hasCompletedAllSteps } = useStepper();

  if (!hasCompletedAllSteps) return null;

  return (
    <div className="text-center">
      <p>Супер! Теперь вы можете войти в свой аккаунт под новым паролем! 🎉</p>
      <Button asChild variant="link" className="mt-1">
        <Link href={RoutesMap.Login}>
          Авторизоваться <Icons.ArrowRight className="ml-2" />
        </Link>
      </Button>
    </div>
  );
}
