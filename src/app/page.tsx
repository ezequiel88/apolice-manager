"use client"

import React from 'react';
import ApoliceList from "@/components/apolice/ApoliceList";
import Header from "@/components/ui/Header";
import { useRouter } from "next/navigation";

export default function ApolicePage() {
  const router = useRouter()
  return (
    <>
      <Header
        title={"Apólices"}
        buttonText="Cadastrar"
        onActionClick={() => router.push("/apolice")}
      />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ApoliceList />
      </main>
    </>
  )
}