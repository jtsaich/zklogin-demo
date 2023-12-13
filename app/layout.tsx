import Nav from "@/components/nav";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { Suspense } from "react";
import { inter, sfPro } from "./fonts";
import "./globals.css";

export const metadata = {
  title: "SuiReviews - Taipei Blockchain Week 2023",
  description: "Powered by zkLogin, a privacy centric location review app.",
  twitter: {
    card: "summary_large_image",
    title: "SuiReviews - Taipei Blockchain Week 2023",
    description: "Powered by zkLogin, a privacy centric location review app.",
  },
  metadataBase: new URL("https://zklogin-demo-jtsaich.vercel.app"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable)}>
        <div className="fixed h-screen w-full bg-gradient-to-br from-purple-200 via-white to-blue-200" />
        <Suspense fallback="...">
          {/* @ts-expect-error */}
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          {children}
        </main>
        {/* <Footer /> */}
        <Analytics />
      </body>
      <script
        async
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDlsKdpc3vluW5nANFlrnXDc5EKOdIUArQ&libraries=places"
      ></script>
    </html>
  );
}
