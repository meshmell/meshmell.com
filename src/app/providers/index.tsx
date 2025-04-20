"use client";

// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import * as React from "react";

import { ThemeProvider } from "@/components/ui/theme-provider";

export function Providers(props: {
  children: React.ReactNode;
  session: Session;
  messages: Awaited<ReturnType<typeof getMessages>>;
  locale: string;
}) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <NextIntlClientProvider locale={props.locale} messages={props.messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider session={props.session}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryStreamedHydration>
              {props.children}
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </ReactQueryStreamedHydration>
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
