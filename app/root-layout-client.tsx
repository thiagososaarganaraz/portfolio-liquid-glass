"use client"

import { LanguageProvider } from "@/context/LanguageContext"
import React from "react"

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <body className="font-sans antialiased">{children}</body>
    </LanguageProvider>
  )
}
