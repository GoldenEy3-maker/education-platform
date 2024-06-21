"use client";

import { z } from "zod";
import { useRestorePasswordStore } from "./store";
import { useStepper } from "@/components/stepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { RoutesMap } from "@/lib/enums";
import { useServerActionMutation } from "@/hook/use-server-action";
import { restorePassword } from "@/server/actions/mailer";

const loginFormSchema = z.object({
  login: z.string().min(1, "Обязательное поле!"),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const restorePasswordStore = useRestorePasswordStore();
  const { nextStep } = useStepper();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      login: restorePasswordStore.login,
    },
  });

  const sendMailMutation = useServerActionMutation(restorePassword, {
    onSuccess(data) {
      nextStep();
      toast.success("Сообщение успешно отправлено!");
      restorePasswordStore.setId(data.id);
      restorePasswordStore.setCode(data.code);
      restorePasswordStore.setLogin(data.login);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  async function onSubmit(values: LoginFormSchema) {
    await sendMailMutation.mutateAsync(values);
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="login"
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Логин</FormLabel>
              <FormControl>
                <Input placeholder="ivanon.105s1" {...field} />
              </FormControl>
              <FormDescription>
                Если письмо долго не приходить, проверьте папку спам, или
                обратитесь в тех. отдел.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <footer className="flex flex-wrap items-center justify-between gap-2">
          <Button asChild variant="link">
            <Link href={RoutesMap.Login}>Авторизация</Link>
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            isSubmitting={form.formState.isSubmitting}
          >
            Дальше
          </Button>
        </footer>
      </form>
    </Form>
  );
}
