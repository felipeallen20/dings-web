import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import { BottomBar } from "@/components/layout/BottomBar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Dings",
  description: "Pide comida a domicilio en tu barrio",
};

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <BottomBar />
      {children}
      <Footer />
    </>
  );
}