import { Header } from "@/components/common";
import RecoilRootProvider from "@/utils/recoilRootProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TIM",
  description: "영화/드라마 본것을 기록한 웹사이트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className} suppressHydrationWarning={true}>
        <RecoilRootProvider>
          <Header />
          {children}
        </RecoilRootProvider>
      </body>
    </html>
  );
}
