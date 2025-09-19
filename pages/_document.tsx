import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon configuration - order matters */}
        <link rel="icon" type="image/svg+xml" href="/asset/planpro-favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/asset/planpro-favicon.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/asset/planpro-favicon.svg" />
        <link rel="shortcut icon" href="/asset/planpro-favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/asset/planpro-icon.svg" />
        <link rel="manifest" href="/manifest.json" />

        {/* Override Next.js default favicon */}
        <link rel="icon" href="/asset/planpro-favicon.svg" />

        <meta name="theme-color" content="#3B82F6" />
        <meta name="description" content="PlanPro - Smart Project Management System" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
