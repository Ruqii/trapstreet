import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trap Street — H4 for AI workflows",
  description:
    "We don't fine-tune models. We test claims. We run real tasks. We expose what works, what fails, and what lies.",
  metadataBase: new URL("https://trapstreet.run"),
  openGraph: {
    title: "Trap Street — H4 for AI workflows",
    description:
      "Find the fakes. Community evaluation harness for AI workflows.",
    url: "https://trapstreet.run",
    siteName: "Trap Street",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
