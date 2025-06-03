import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "@/components/ui/layout/RootLayout";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const basePathAuth = process.env.NEXT_PUBLIC_AUTH_BASE_PATH;
  if (Component.getLayout) {
    return (
      <SessionProvider session={pageProps.session} basePath={basePathAuth}>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              pointerEvents: 'none'
            }
          }} />
        <QueryClientProvider client={queryClient}>
          {Component.getLayout(<Component {...pageProps} />)}
        </QueryClientProvider>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={pageProps.session} basePath={basePathAuth}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            pointerEvents: 'none'
          }
        }} />
      <QueryClientProvider client={queryClient}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </QueryClientProvider>
    </SessionProvider>
  );
}