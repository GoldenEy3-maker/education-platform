"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RoutesMap } from "@/lib/enums";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { signIn } from "@/server/actions/auth";
import { useServerActionMutation } from "@/hook/use-server-action";
import { getQueryClient } from "@/lib/get-query-client";

const formSchema = z.object({
  login: z.string().min(1, "Обязательное поле!"),
  password: z.string().min(1, "Обязательное поле!"),
});

type FormSchema = z.infer<typeof formSchema>;

export function LoginForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const queryClient = getQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const signInMutation = useServerActionMutation(signIn, {
    onSuccess(user) {
      toast.success("Авторизация прошла успешно!");
      queryClient.setQueriesData(
        { queryKey: ["getSession"] },
        { ...user, expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) },
      );
      queryClient.invalidateQueries({
        queryKey: ["getSession"],
      });
      router.push(
        searchParams.has("callbackUrl")
          ? searchParams.get("callbackUrl")!
          : RoutesMap.Home,
      );
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  async function onSubmit(values: FormSchema) {
    await signInMutation.mutateAsync(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="login"
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Логин</FormLabel>
              <FormControl>
                <Input placeholder="ivanov.105s1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <footer className="flex items-center justify-between gap-2">
          <Button asChild variant="link" disabled={form.formState.isSubmitting}>
            <Link href="#">Забыли пароль?</Link>
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            isSubmitting={form.formState.isSubmitting}
          >
            Войти
          </Button>
        </footer>
      </form>
    </Form>
  );
}
