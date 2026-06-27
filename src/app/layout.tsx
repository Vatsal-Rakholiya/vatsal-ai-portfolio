import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vatsal Rakholiya | AI Data Scientist Portfolio",
  description:
    "Interactive AI-themed portfolio for Vatsal Rakholiya, Data Scientist focused on machine learning, NLP, forecasting, and document intelligence."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="noise" />
        <div className="scanline" />
        {children}
      </body>
    </html>
  );
}
