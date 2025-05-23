"use client"

import { DashboardNav } from "@/components/utils/navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  return (
    <div className="mb-10">
      <DashboardNav />
      {children}
    </div>
  )

}