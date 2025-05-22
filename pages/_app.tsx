import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RootLayout from "@/components/ui/layout/RootLayout";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}