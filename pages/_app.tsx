import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "@/components/ui/layout/RootLayout";
import { NextPage } from "next";
import { ReactElement, ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
      refetchOnWindowFocus: false,
    }
  }
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const basePathAuth = process.env.NEXT_PUBLIC_AUTH_BASE_PATH;
  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= 1) // Check if toast index exceeds limit
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
  }, [toasts]);
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