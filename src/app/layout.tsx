import "./globals.css";
import type { Metadata } from "next";
import Provider from "./Provider";
import "sfac-designkit-react/style.css";

export const metadata: Metadata = {
  title: "스나이퍼 팩토리",
  description: "스나이퍼 팩토리 LMS시스템입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
