"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingCover from "@/src/components/LoadingCover";
import Logo from "@/src/components/Logo";
import { RegisterSchema } from "@/src/schemas/auth";
import { register as registerUser } from "@/src/utils/auth/register";

import type { z } from "zod";
import { Link } from "@/src/i18n/navigation";

const SignupForm = () => {
  const t = useTranslations("main");
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    setError("");
    setSuccess("");

    startTransition(() => {
      registerUser(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data.success) {
          router.push("/auth/login");
        } else {
          setLoading(false);
        }
      });
    });
  };

  useEffect(() => {
    if (success) {
      router.push("/auth/login");
    }
  }, [success, router]);

  return (
    <>
      {loading && <LoadingCover />}
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-center">
            <Logo withDescription={false} />
          </div>
          <CardTitle className="text-2xl">{t("auth.signup")}</CardTitle>
          <CardDescription>{t("auth.signupDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("auth.name")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("auth.name")}
                          {...field}
                          disabled={isPending}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("auth.email")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("auth.email")}
                          {...field}
                          disabled={isPending}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("auth.password")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t("auth.password")}
                          {...field}
                          disabled={isPending}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {success && (
                  <Alert className="border-green-200 bg-green-50 text-green-800">
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full">
                  {t("auth.signup")}
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            {t("auth.hasAccount")}{" "}
            <Link href="/auth/login" className="underline underline-offset-4">
              {t("auth.login")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SignupForm;
