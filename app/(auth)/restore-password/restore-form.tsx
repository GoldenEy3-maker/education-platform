"use client";

import { z } from "zod";
import { useRestorePasswordStore } from "./store";
import { useForm } from "react-hook-form";
import { useStepper } from "@/components/stepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerActionMutation } from "@/hook/use-server-action";
import { restorePassword } from "@/server/actions/user";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const restorePasswordFormSchema = z
  .object({
    password: z.string().min(8, "Пароль должен быть миниму 8 символов!"),
    confirmPassword: z.string().min(1, "Обязательное поле!"),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Пароли не совпадают!",
    path: ["confirmPassword"],
  });

type RestorePasswordFormSchema = z.infer<typeof restorePasswordFormSchema>;

export function RestorePasswordForm() {
  const restorePasswordStore = useRestorePasswordStore();
  const { nextStep } = useStepper();

  const form = useForm<RestorePasswordFormSchema>({
    resolver: zodResolver(restorePasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const resetPasswordMutation = useServerActionMutation(restorePassword, {
    onSuccess() {
      toast.success("Пароль успешно обновлен!");
      restorePasswordStore.reset();
      nextStep();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  async function onSubmit(values: RestorePasswordFormSchema) {
    await resetPasswordMutation.mutateAsync({
      id: restorePasswordStore.id,
      password: values.password,
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="password"
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Новый пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Повторите пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <footer className="flex flex-wrap items-center justify-end gap-2">
          <Button
            disabled={form.formState.isSubmitting}
            isSubmitting={form.formState.isSubmitting}
          >
            Отправить
          </Button>
        </footer>
      </form>
    </Form>
  );
}
