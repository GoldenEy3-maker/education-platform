"use client";

import { z } from "zod";
import { useRestorePasswordStore } from "./store";
import { useStepper } from "@/components/stepper";
import { useInterval, useMediaQuery } from "usehooks-ts";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerActionMutation } from "@/hook/use-server-action";
import { restorePassword } from "@/server/actions/mailer";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/Icons";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import FlipNumbers from "react-flip-numbers";

const codeFormSchema = z.object({
  code: z
    .string()
    .min(6, "Код восставновления всегда состоит минимум из 6 символов!"),
});

type CodeFormSchema = z.infer<typeof codeFormSchema>;

export function CodeForm() {
  const restorePasswordStore = useRestorePasswordStore();
  const { nextStep, prevStep } = useStepper();
  const isXsMobile = useMediaQuery("(max-width: 425px)");

  const [timer, setTimer] = useState(59);
  const [isCodeValidating, setIsCodeValidating] = useState(false);

  const form = useForm<CodeFormSchema>({
    resolver: zodResolver(codeFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const resendMailMutation = useServerActionMutation(restorePassword, {
    onSuccess(data) {
      toast.success("Сообщение успешно отправлено!");
      restorePasswordStore.setCode(data.code);
      setTimer(59);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  function validateCode(code: string) {
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        if (code === restorePasswordStore.code) {
          nextStep();
        } else {
          form.setError("code", {
            message: "Неверный код подтверждения!",
          });
        }

        resolve();
      }, 1000),
    );
  }

  async function onSubmit(values: CodeFormSchema) {
    await validateCode(values.code);
  }

  const isSubmitting =
    resendMailMutation.isPending ||
    form.formState.isSubmitting ||
    isCodeValidating;

  useInterval(() => setTimer((prev) => prev - 1), timer > 0 ? 1000 : null);

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="code"
          disabled={isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Код подтверждения</FormLabel>
              <FormControl>
                <InputOTP
                  autoFocus
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  onComplete={async () => {
                    setIsCodeValidating(true);
                    await validateCode(form.getValues("code"));
                    setIsCodeValidating(false);
                  }}
                  {...field}
                >
                  {isXsMobile ? (
                    <>
                      <InputOTPGroup className="w-full justify-center">
                        <InputOTPSlot className="h-9 w-9" index={0} />
                        <InputOTPSlot className="h-9 w-9" index={1} />
                        <InputOTPSlot className="h-9 w-9" index={2} />
                        <InputOTPSlot className="h-9 w-9" index={3} />
                        <InputOTPSlot className="h-9 w-9" index={4} />
                        <InputOTPSlot className="h-9 w-9" index={5} />
                      </InputOTPGroup>
                    </>
                  ) : (
                    <div className="flex w-full items-center justify-center">
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </div>
                  )}
                </InputOTP>
              </FormControl>
              <FormDescription>
                {timer > 0 ? (
                  <div className="flex flex-wrap items-center">
                    Отправить повторно код через:&nbsp;
                    <FlipNumbers
                      width={9}
                      height={14}
                      color=""
                      play
                      numbers={timer.toString()}
                    />
                    &nbsp;сек.
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="link"
                    disabled={isSubmitting}
                    onClick={() =>
                      resendMailMutation.mutate({
                        login: restorePasswordStore.login,
                      })
                    }
                    isSubmitting={isSubmitting}
                  >
                    Отправить код еще раз
                  </Button>
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <footer className="flex flex-wrap items-center justify-between gap-2">
          <Button
            type="button"
            variant="link"
            disabled={isSubmitting}
            onClick={prevStep}
          >
            <Icons.ArrowLeft className="mr-2 text-lg" />
            <span>Назад</span>
          </Button>
          <Button disabled={isSubmitting}>Дальше</Button>
        </footer>
      </form>
    </Form>
  );
}
