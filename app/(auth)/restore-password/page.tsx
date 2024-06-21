"use client";

import { Step, Stepper } from "@/components/stepper";
import { LoginForm } from "./login-form";
import { CodeForm } from "./code-form";
import { RestorePasswordForm } from "./restore-form";
import { StepperActions } from "./actions";

const steps = [{ label: "Логин" }, { label: "Код" }, { label: "Смена пароля" }];

export default function RestorePasswordPage() {
  return (
    <div className="bg-background p-8">
      <h3 className="mb-1 text-center text-xl font-medium">
        Восстановление пароля
      </h3>
      <p className="mb-4 text-center text-sm text-muted-foreground">
        Для восстановления пароля требуется иметь привязанный email адрес на
        аккаунте.
      </p>
      <div className="space-y-4">
        <Stepper variant="circle-alt" initialStep={0} steps={steps}>
          {steps.map((step, index) => {
            if (index === 0) {
              return (
                <Step key={step.label}>
                  <LoginForm />
                </Step>
              );
            }

            if (index === 1) {
              return (
                <Step key={step.label}>
                  <CodeForm />
                </Step>
              );
            }

            return (
              <Step key={step.label}>
                <RestorePasswordForm />
              </Step>
            );
          })}
          <StepperActions />
        </Stepper>
      </div>
    </div>
  );
}
